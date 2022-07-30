import { buff2Str } from "@helpers/buff2str"
import { SMSG_NAME_QUERY_RESPONSE_RETURN } from "@type/parsers-types"

export const PARSE_SMSG_NAME_QUERY_RESPONSE = (packet: Buffer): SMSG_NAME_QUERY_RESPONSE_RETURN => {
  let offset = 0
  const mask = packet.readUInt8(offset).toString(2)

  offset++

  const GUID = Buffer.alloc(8)
  for (let i = mask.length - 1; i >= 0; i--) {
    if (mask[i] === "1") {
      GUID[8 - (i + 1)] = packet[offset]
      offset++
    } else {
      GUID[8 - (i + 1)] = 0x00
    }
  }

  const nameIsKnown = packet.readUInt8(offset)
  offset++

  let name: string | null = null

  for (let i = offset; i < packet.length; i++) {
    if (packet[i] === 0x00) {
      name = buff2Str(packet.slice(offset, i))
      offset += i - offset + 1
      break
    }
  }

  // const maybeRealName = packet.readUInt8(offset)
  // offset++

  // const race = packet.readUInt8(offset)
  // offset++

  // const sex = packet.readUInt8(offset)
  // offset++

  // const playerClass = packet.readUint8(offset)
  // offset++

  /*  
    87 
    37 8d 78 07
    00 
    4e 61 67 79 70 61 74 69 6b 61
    00
    00 
    race 01 
    sex 00
    priest 05
    name is not declined 00
    */
  return { GUID, name }
}
