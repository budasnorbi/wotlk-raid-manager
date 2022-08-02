import { Logger } from "@nestjs/common"
import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets"
import { Server, Socket } from "socket.io"
import { ParserService } from "./parser.service"
import { LocalDbService } from "@modules/localdb/localdb.service"
import { CharacterInfoService } from "@modules/characterinfo/characterinfo.service"
import { destructItem } from "@helpers/destruct-item"
import { getItemIdFromMessage } from "@helpers/itemid-from-chat"
import { Member, Raid, RollResult, RollType } from "@type/parsers-types"
import { Opcodes, ChatType } from "@type/trinity-types"
import { formatBufferForPrint } from "@helpers/format-buffer"

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class ParserGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  socket: Server
  private logger: Logger = new Logger("SocketGateway")

  raidData: Raid
  rollHistory: RollResult[] = []
  currentRollEvent: RollResult | null = null
  nameStorage: Member[] = []

  constructor(
    private parserService: ParserService,
    private localDbService: LocalDbService,
    private characterInfoService: CharacterInfoService
  ) {
    // Handle SMSG_NAME_QUERY_RESPONSE
    this.parserService.registerEvent(Opcodes.SMSG_NAME_QUERY_RESPONSE, async (packetData) => {
      if (!this.nameStorage.some((nameObj) => nameObj.name === packetData.name)) {
        this.nameStorage.push({ ...packetData, characterInfo: null })
      }
    })

    // Handle SMSG_GROUP_LIST
    this.parserService.registerEvent(Opcodes.SMSG_GROUP_LIST, async (packetData) => {
      if (this.raidData && !packetData) {
        this.socket.emit("RAID_GROUP_CONVERTED_TO_GROUP", null)
      }
      // PARTY GROUP CONVERTED TO RAID
      if (!this.raidData && packetData) {
        const leader = this.nameStorage.find((nameObj) =>
          nameObj.GUID.equals(packetData.leaderGUID)
        )

        if (!leader) {
          this.socket.emit("RAID_NO_LEADER_ERROR", {
            error: `There is no leader with this GUID ${formatBufferForPrint(
              packetData.leaderGUID
            )}`
          })
          return
        }

        const members: Member[] = []
        for (let i = 0; i < packetData.members.length; i++) {
          const { GUID, name } = packetData.members[i]
          const characterInfo = await this.characterInfoService.getCharacterInfo(name)

          members.push({
            characterInfo,
            GUID,
            name
          })
        }

        const leaderCharacterInfo = await this.characterInfoService.getCharacterInfo(leader.name)

        this.raidData = {
          groupType: packetData.groupType,
          leaderGUID: packetData.leaderGUID,
          leaderName: leader.name,
          leaderCharacterInfo,
          memberCount: packetData.memberCount,
          members,
          lootMethod: packetData.lootMethod,
          lootTreshold: packetData.lootTreshold,
          raidDifficulty: packetData.raidDifficulty
        }

        this.socket.emit("PARTY_GROUP_CONVERTED_TO_RAID", this.raidData)
      }

      // Handle RAID IS UPDATED
      if (this.raidData && packetData) {
        // NEW PLAYER JOINED
        if (this.raidData.memberCount < packetData.memberCount) {
          const newMember = packetData.members.find((member) =>
            this.raidData.members.some((raidMember) => member.name !== raidMember.name)
          )

          if (newMember) {
            const { GUID, name } = newMember
            const characterInfo = await this.characterInfoService.getCharacterInfo(newMember.name)
            this.raidData.members.push({ GUID, name, characterInfo })
            this.raidData.memberCount = packetData.memberCount

            this.socket.emit("PLAYER_JOINED_TO_THE_RAID", { GUID, name, characterInfo })
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

            this.socket.emit("PLAYER_LEAVED_THE_RAID", { name: leavedRaidMember.name })
          }
        }

        // RAID LEADER IS UPDATED
        if (!this.raidData.leaderGUID.equals(packetData.leaderGUID)) {
          const oldLeader = {
            name: this.raidData.leaderName,
            GUID: this.raidData.leaderGUID.slice(),
            characterInfo: this.raidData.leaderCharacterInfo
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
            this.raidData.leaderCharacterInfo = newLeader.characterInfo

            this.socket.emit("RAID_LEADER_UPDATED", { name: newLeader.name })
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

          this.socket.emit("RAID_LOOT_TRESHOLD_UPDATED", { treshold: packetData.lootTreshold })
        }
      }
    })

    // Handle SMSG_MESSAGECHAT
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
            this.socket.emit("RAID_NO_ITEMID_IN_CHAT_ERROR", {
              error: `There is no itemId in the chat message`
            })
            return
          }

          const rollType: RollType = message.includes("ms") ? "ms" : "os"
          const item = destructItem(this.localDbService.item(itemId))

          this.rollHistory.push({
            item,
            rolledMembers: []
          })

          this.socket.emit("RAID_ROLL_STARTED", { item, type: rollType })
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
              winnerRoll: winner.roll,
              winnerName: winner.name
            })
          }
        }
      }
    })

    // Handle MSG_RANDOM_ROLL
    this.parserService.registerEvent(Opcodes.MSG_RANDOM_ROLL, async (rollData) => {
      if (
        rollData?.min == 1 &&
        rollData?.max == 100 &&
        (this.raidData.members.some((member) => member.GUID.equals(rollData?.GUID)) ||
          this.raidData.leaderGUID.equals(rollData?.GUID))
      ) {
        const lastRollEvent = this.currentRollEvent

        if (
          // Preventing multiple rolls from same person who is already rolled
          lastRollEvent?.rolledMembers.some((rolledMember) =>
            rolledMember.GUID.equals(rollData.GUID)
          )
        ) {
          const rollMemberInfo = this.raidData.members.find((member) =>
            member.GUID.equals(rollData.GUID)
          )

          if (!rollMemberInfo) {
            this.socket.emit("RAID_NO_ROLL_MEMBER_INFO_ERROR", {
              error: `There is no rollMember with GUID ${formatBufferForPrint(rollData.GUID)}`
            })
            return
          }

          const playerItemFromArmory =
            await this.characterInfoService.getCharacterItemByInventoryType(
              rollMemberInfo.name,
              lastRollEvent.item.inventoryType
            )

          const characterItemSlotIndex = rollMemberInfo.characterInfo.items.findIndex(
            (itemSlot) => itemSlot.item.inventoryType === lastRollEvent.item.inventoryType
          )

          if (characterItemSlotIndex === -1) {
            // The character item slot is emptry
            this.socket.emit("RAID_NO_CHARACTER_ITEM_SLOT_INDEX_ERROR", {
              error: `There is no item found in rollMemberInfo with item inventoryType ${playerItemFromArmory.item.inventoryType}`
            })
            return
          }

          // If the character's item is different than the saved one
          if (
            rollMemberInfo.characterInfo.items[characterItemSlotIndex].item.entry !==
            playerItemFromArmory.item.entry
          ) {
            rollMemberInfo.characterInfo.items[characterItemSlotIndex] = playerItemFromArmory
          }

          const rollDetails = {
            item: playerItemFromArmory.item,
            name: rollMemberInfo.name,
            GUID: rollData.GUID,
            roll: rollData.roll
          }

          lastRollEvent.rolledMembers.push(rollDetails)
          this.socket.emit("RAID_PLAYER_ROLLED", rollDetails)
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
      client.emit("RAID_DETAILS", this.raidData)
    }

    this.logger.log(`Client connected: ${client.id}`)
  }
}
