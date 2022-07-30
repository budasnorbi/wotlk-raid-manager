import { SMSG_MESSAGECHAT_RETURN } from "@type/parsers-types"
import { ChatType, Language } from "@type/trinity-types"

export const PARSE_SMSG_MESSAGECHAT = (packet: Buffer): SMSG_MESSAGECHAT_RETURN => {
  let offset = 0
  const type: ChatType = packet.readUInt8(offset)
  offset++

  const language: Language = packet.readUInt32LE(offset)
  offset += 4

  const senderGUID = packet.slice(offset, offset + 8)
  offset += 8

  //const bullshitZeroes = packet.readUInt32LE(offset)
  offset += 4

  const receiverGUID = packet.slice(offset, offset + 8)
  offset += 8

  const messageLength = packet.readInt32LE(offset)
  offset += 4

  const message = packet.slice(offset, packet.length - 2).toString()
  offset += packet.length - 2 - offset

  const chatTag = packet.readUInt8(offset)
  offset++

  //const unknownByte = packet.readUInt8(offset)

  return {
    type,
    language,
    senderGUID,
    receiverGUID,
    messageLength,
    message,
    chatTag
  }
}
