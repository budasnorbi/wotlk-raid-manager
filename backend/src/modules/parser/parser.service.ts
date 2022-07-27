import { Injectable, Logger } from "@nestjs/common"
import { Opcodes, OpcodeValues } from "@type/opcodes"
import { Raid } from "@type/raid"
import { SMSG_MESSAGECHAT_RETURN } from "@type/chat"
import * as net from "net"
import * as udp from "dgram"
import { MSG_RANDOM_ROLL_RETURN } from "@type/roll"
import { SMSG_NAME_QUERY_RESPONSE_RETURN } from "@type/query"
import { PARSE_MSG_RANDOM_ROLL } from "@helpers/parsers/MSG_RANDOM_ROLL"
import { PARSE_SMSG_GROUP_LIST } from "@helpers/parsers/SMSG_GROUP_LIST"
import { PARSE_SMSG_MESSAGECHAT } from "@helpers/parsers/SMSG_MESSAGECHAT"
import { PARSE_SMSG_NAME_QUERY_RESPONSE } from "@helpers/parsers/SMSG_NAME_QUERY_RESPONSE"

type ImplementedOpcodes =
  | Opcodes.MSG_RANDOM_ROLL
  | Opcodes.SMSG_GROUP_LIST
  | Opcodes.SMSG_MESSAGECHAT
  | Opcodes.SMSG_NAME_QUERY_RESPONSE

@Injectable()
export class ParserService {
  port = 54000
  udpServer: net.Server = new net.Server()
  client = udp.createSocket("udp4")
  private logger: Logger = new Logger("ParserService")

  events: {
    [key in ImplementedOpcodes]?: {
      handler: (packet: Buffer) => any
      actions: ((parsedData: any) => Promise<void>)[]
      debugActions: boolean[]
    }
  } = {}

  constructor() {
    // Register Handlers
    this.registerOpCodeHandler(Opcodes.MSG_RANDOM_ROLL, PARSE_MSG_RANDOM_ROLL)
    this.registerOpCodeHandler(Opcodes.SMSG_GROUP_LIST, PARSE_SMSG_GROUP_LIST)
    this.registerOpCodeHandler(Opcodes.SMSG_MESSAGECHAT, PARSE_SMSG_MESSAGECHAT)
    this.registerOpCodeHandler(Opcodes.SMSG_NAME_QUERY_RESPONSE, PARSE_SMSG_NAME_QUERY_RESPONSE)

    this.udpServer.listen(this.port, () => {
      this.logger.log(
        `UDP Server listening for connection requests on socket localhost:${this.port}.`
      )
    })

    this.udpServer.on("connection", (socket) => {
      socket.on("data", async (data) => {
        const opCode: ImplementedOpcodes = data.readUint32LE()
        const packetData = data.slice(4)

        if (this.events[opCode] && this.events[opCode].actions.length !== 0) {
          for (let i = 0; i < this.events[opCode].actions.length; i++) {
            const parsedData = this.events[opCode].handler(packetData)
            if (this.events[opCode].debugActions[i]) {
              this.printPacket(opCode, packetData)
            }
            await this.events[opCode].actions[i](parsedData)
          }
        }
      })
    })
  }

  public registerEvent(
    opCode: Opcodes.SMSG_MESSAGECHAT,
    actionHandler: (parsedData: SMSG_MESSAGECHAT_RETURN) => Promise<void>,
    debug?: boolean
  ): void
  public registerEvent(
    opCode: Opcodes.SMSG_GROUP_LIST,
    actionHandler: (parsedData: Raid) => Promise<void>,
    debug?: boolean
  ): void
  public registerEvent(
    opCode: Opcodes.SMSG_NAME_QUERY_RESPONSE,
    actionHandler: (parsedData: SMSG_NAME_QUERY_RESPONSE_RETURN) => Promise<void>,
    debug?: boolean
  ): void
  public registerEvent(
    opCode: Opcodes.MSG_RANDOM_ROLL,
    actionHandler: (parsedData: MSG_RANDOM_ROLL_RETURN) => Promise<void>,
    debug?: boolean
  ): void
  public registerEvent(opCode, actionHandler, debug = false) {
    this.events[opCode].actions.push(actionHandler)
    this.events[opCode].debugActions.push(debug)
  }

  private registerOpCodeHandler(
    opCode: ImplementedOpcodes,
    opCodeHandler: (packet: Buffer) => any
  ) {
    this.logger.log(`${Opcodes[opCode]} packet handler initialized`)

    this.events[opCode] = {
      handler: opCodeHandler,
      debugActions: [],
      actions: []
    }
  }

  public printPacket(opCode: OpcodeValues, packetData: Buffer) {
    const findedOpcode = Object.entries(Opcodes).filter((entry) => {
      return entry[1] === opCode
    })[0]

    this.logger.debug(`${findedOpcode[0]}`, packetData.toString("hex").match(/../g).join(" "))
  }
}
