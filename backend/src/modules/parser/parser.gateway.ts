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
            this.parserService.SMSG_GROUP_LIST(packetData, (data) => {
              this.socket.emit(Opcodes.SMSG_GROUP_LIST.toString(), data)
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
