import { Logger } from "@nestjs/common"
import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  SubscribeMessage
} from "@nestjs/websockets"
import { Server, Socket } from "socket.io"
import { Opcodes } from "@type/opcodes"
import { ParserService } from "./parser.service"
import { RaidWithDetailedLeader } from "@type/raid"
import { ChatType } from "@type/chat"
import { LocalDbService } from "@modules/localdb/localdb.service"
import { CharacterInfoService } from "@modules/characterinfo/characterinfo.service"
import { destructItem } from "@helpers/destruct-item"
import { RollResult } from "@type/roll-result"
import { getItemIdFromMessage } from "@helpers/itemid-from-chat"

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class ParserGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  socket: Server
  private logger: Logger = new Logger("SocketGateway")

  raidData: RaidWithDetailedLeader
  rollHistory: RollResult[] = []
  currentRollEvent: RollResult | null = null
  nameStorage: { name: string; GUID: Buffer }[] = []

  constructor(
    private parserService: ParserService,
    private localDbService: LocalDbService,
    private characterInfoService: CharacterInfoService
  ) {
    // SMSG_NAME_QUERY_RESPONSE
    this.parserService.registerEvent(Opcodes.SMSG_NAME_QUERY_RESPONSE, async (nameData) => {
      if (!this.nameStorage.some((nameObj) => nameObj.name === nameData.name)) {
        this.nameStorage.push(nameData)
      }
    })

    this.parserService.registerEvent(Opcodes.SMSG_GROUP_LIST, async (packetData) => {
      // PARTY GROUP CONVERTED TO RAID
      if (!this.raidData && packetData) {
        const leader = this.nameStorage.find((nameObj) =>
          nameObj.GUID.equals(packetData.leaderGUID)
        )

        if (!leader) {
          return
        }

        this.raidData = { ...packetData, leaderName: leader.name }

        const { members, leaderGUID, leaderName, raidDifficulty, lootMethod } = this.raidData

        this.socket.emit("PARTY_GROUP_CONVERTED_TO_RAID", {
          leaderGUID,
          leaderName,
          members,
          raidDifficulty,
          lootMethod
        })
      }

      // RAID IS UPDATED
      if (this.raidData && packetData) {
        // NEW PLAYER JOINED
        if (this.raidData.memberCount < packetData.memberCount) {
          const newMember = packetData.members.find((member) =>
            this.raidData.members.some((raidMember) => member.name !== raidMember.name)
          )

          if (newMember) {
            this.raidData.members.push(newMember)
            this.raidData.memberCount = packetData.memberCount

            this.socket.emit("PLAYER_JOINED_TO_THE_RAID", newMember)
          }
        }

        // PLAYER LEAVED THE GROUP
        if (this.raidData.memberCount > packetData.memberCount) {
          const leavedRaidMember = this.raidData.members.find((member) =>
            packetData.members.some((packetMember) => packetMember.name !== member.name)
          )

          if (leavedRaidMember) {
            this.raidData.members = this.raidData.members.filter(
              (member) => member.name !== leavedRaidMember.name
            )
            this.raidData.memberCount = packetData.memberCount
            this.socket.emit("PLAYER_LEAVED_THE_RAID", leavedRaidMember)
          }
        }

        // RAID LEADER IS UPDATED
        if (!this.raidData.leaderGUID.equals(packetData.leaderGUID)) {
          const oldLeader = {
            name: this.raidData.leaderName,
            GUID: this.raidData.leaderGUID.slice()
          }

          const newLeader =
            this.raidData.members.find((member) => member.GUID.equals(packetData.leaderGUID)) ||
            this.nameStorage.find((nameObj) => nameObj.GUID.equals(packetData.leaderGUID))

          if (newLeader) {
            this.raidData.members = this.raidData.members.filter(
              (member) => member.name !== newLeader.name
            )
            this.raidData.members.push(oldLeader)

            this.raidData.leaderGUID = newLeader.GUID
            this.raidData.leaderName = newLeader.name

            this.socket.emit("RAID_LEADER_UPDATED", {
              leaderGUID: this.raidData.leaderGUID,
              leaderName: this.raidData.leaderName,
              members: this.raidData.members
            })
          }
        }

        // RAID DIFFICULTY UPDATED
        if (this.raidData.raidDifficulty !== packetData.raidDifficulty) {
          this.raidData.raidDifficulty = packetData.raidDifficulty

          this.socket.emit("RAID_DIFFICULTY_UPDATED", { raidDifficulty: packetData.raidDifficulty })
        }

        // LOOTMETHOD UPDATED
        if (this.raidData.lootMethod !== packetData.lootMethod) {
          this.raidData.lootMethod = packetData.lootMethod

          this.socket.emit("RAID_LOOTMETHOD_UPDATED", { lootMethod: packetData.lootMethod })
        }

        // LOOTTRESHOLD UPDATED
        if (this.raidData.lootTreshold !== packetData.lootTreshold) {
          this.raidData.lootTreshold = packetData.lootTreshold

          this.socket.emit("RAID_LOOT_TRESHOLD_UPDATED", { lootTreshold: packetData.lootTreshold })
        }
      }
    })

    // SMSG_MESSAGECHAT
    this.parserService.registerEvent(Opcodes.SMSG_MESSAGECHAT, async (messageData) => {
      if (this.raidData && messageData && messageData.senderGUID.equals(this.raidData.leaderGUID)) {
        const message = messageData.message.toLocaleLowerCase()

        // RAID_ROLL_STARTED
        if (
          messageData.type === ChatType.CHAT_MSG_RAID_WARNING &&
          message.includes("roll") &&
          (message.includes("ms") || message.includes("os")) &&
          // Make sure the last roll is finished
          !this.currentRollEvent
        ) {
          const itemId = getItemIdFromMessage(message)

          if (!itemId) {
            return
          }

          const rollType = message.includes("ms") ? "ms" : "os"
          const item = destructItem(this.localDbService.item(itemId))

          this.rollHistory.push({
            item,
            rolledMembers: []
          })

          this.socket.emit("RAID_ROLL_STARTED", { item, rollType })
        }

        // RAID_ROLL_ENDED
        if (
          messageData.type === ChatType.CHAT_MSG_RAID_LEADER &&
          messageData.senderGUID.equals(this.raidData.leaderGUID) &&
          (message.includes("won") || message.includes("no winner for"))
        ) {
          const lastRollEvent = this.currentRollEvent

          this.rollHistory.push(lastRollEvent)
          this.currentRollEvent = null

          if (lastRollEvent.rolledMembers.length !== 0) {
            const winner = lastRollEvent.rolledMembers.sort((a, b) => b.roll - a.roll)[0]

            this.socket.emit("RAID_ROLL_ENDED", {
              roll: winner.roll,
              name: winner.name
            })
          }
        }
      }
    })

    // MSG_RANDOM_ROLL
    this.parserService.registerEvent(Opcodes.MSG_RANDOM_ROLL, async (rollData) => {
      if (
        rollData &&
        rollData.min == 1 &&
        rollData.max == 100 &&
        (this.raidData.members.some((member) => member.GUID.equals(rollData.GUID)) ||
          this.raidData.leaderGUID.equals(rollData.GUID))
      ) {
        const lastRollEvent = this.currentRollEvent

        if (
          lastRollEvent &&
          // Preventing multiple rolls from same person who is already rolled
          lastRollEvent.rolledMembers.some((rolledMember) =>
            rolledMember.GUID.equals(rollData.GUID)
          )
        ) {
          const rollMemberInfo =
            this.raidData.members.find((member) => member.GUID.equals(rollData.GUID)) ??
            // If the system can't find roller name at raid members
            this.nameStorage.find((nameObj) => nameObj.GUID.equals(rollData.GUID))

          if (rollMemberInfo) {
            const item = await this.characterInfoService.getCharacterItemByInventoryType(
              rollMemberInfo.name,
              lastRollEvent.item.inventoryType
            )

            const rollDetails = {
              item,
              GUID: rollData.GUID,
              name: rollMemberInfo.name,
              roll: rollData.roll
            }

            lastRollEvent.rolledMembers.push(rollDetails)
            this.socket.emit("RAID_PLAYER_ROLLED", rollDetails)
          }
        }
      }
    })
  }

  afterInit() {
    this.logger.log(`Socket Initialized`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  handleConnection(client: Socket) {
    if (this.raidData) {
      const { members, leaderGUID, leaderName, raidDifficulty, lootMethod } = this.raidData

      client.emit("RAID_DETAILS", {
        members,
        leaderGUID,
        leaderName,
        raidDifficulty,
        lootMethod
      })
    }

    this.logger.log(`Client connected: ${client.id}`)
  }
}
