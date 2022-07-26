import { Logger } from "@nestjs/common"
import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets"
import { Server, Socket } from "socket.io"
import * as net from "net"
import * as udp from "dgram"
import { Opcodes } from "@type/opcodes"
import { ParserService } from "./parser.service"
import { GroupType, Raid } from "@type/raid"
import { ChatType } from "@type/chat"
import * as asyncFs from "fs/promises"
import { DBItem } from "@type/item"
import { dirname } from "path"
const appDir = dirname(require.main.filename)

@WebSocketGateway(3001, {
  cors: {
    origin: "*"
  }
})
export class ParserGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  socket: Server
  private logger: Logger = new Logger("SocketGateway")

  port = 54000
  udpServer: net.Server = new net.Server()
  client = udp.createSocket("udp4")
  raidData: Raid
  rollHistory: any = []

  constructor(private parserService: ParserService) {

    this.udpServer.listen(this.port, () => {
      console.log(`Server listening for connection requests on socket localhost:${this.port}.`)
    })

    this.udpServer.on("connection", (udpSocket) => {
      udpSocket.on("data", (data) => {
        const opCode: Opcodes = data.readUint32LE()
        const packetData = data.slice(4)

        switch (opCode) {
          case Opcodes.SMSG_GROUP_LIST: {
            this.parserService.printPacket(opCode, packetData)
            this.parserService.SMSG_GROUP_LIST(packetData, (data) => {
              this.raidData = data

              //this.socket.emit(Opcodes.SMSG_GROUP_LIST.toString(), data)
            })
            break
          }
          case Opcodes.SMSG_MESSAGECHAT: {
            this.parserService.SMSG_MESSAGECHAT(packetData, (data) => {
              const message = data.message.toLocaleLowerCase()
              if (
                data.type === ChatType.CHAT_MSG_RAID_WARNING &&
                data.senderGUID === this.raidData.leaderGUID &&
                message.includes("roll") &&
                (message.includes("ms") || message.includes("os"))
              ) {
                const entryIdStartIndex = message.indexOf("item:") + 5
                const entryIdEndIndex = message.indexOf(":", entryIdStartIndex + 1)
                const itemId = parseInt(message.substring(entryIdStartIndex, entryIdEndIndex))
                const detailedItem = this.rollHistory.push({})
                console.log(itemId)
              }
            })
            break
          }
          case Opcodes.MSG_RANDOM_ROLL: {
            if (packetData.length === 8) {
              return
            }

            //this.parserService.printPacket(opCode, packetData)
            this.parserService.MSG_RANDOM_ROLL(packetData, (roll) => {
              //console.log(roll)
            })
          }
        }
      })
    })
  }



  afterInit(client: Socket) {
    this.logger.log(`Socket Initialized`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
  }
}
