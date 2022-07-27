import { buff2Str } from "@helpers/buff2str"
import { Raid, Member } from "@type/raid"

export const PARSE_SMSG_GROUP_LIST = (packet: Buffer): Raid => {
  let offset = 0

  const parsedPacket: Raid = {
    groupType: 0,
    subGroup: 0,
    flags: 0,
    playerRolesAssigned: 0,
    groupGUID: null,
    counter: 0,
    memberCount: 0,
    members: [],
    leaderGUID: null,
    lootMethod: 0,
    looterGUID: null,
    lootTreshold: 0,
    dungeonDifficulty: 0,
    raidDifficulty: 0,
    unknownByte: 0
  }

  parsedPacket.groupType = packet.readUInt8(0)
  offset++

  if (parsedPacket.groupType !== 2) {
    return null
  }

  parsedPacket.subGroup = packet.readUInt8(offset)
  offset++

  parsedPacket.flags = packet.readUInt8(offset)
  offset++

  parsedPacket.playerRolesAssigned = packet.readUInt8(offset)
  offset++

  parsedPacket.groupGUID = packet.slice(offset, offset + 8)
  offset += 8

  parsedPacket.counter = packet.readUInt32LE(offset)
  offset += 4

  parsedPacket.memberCount = packet.readUInt32LE(offset)
  offset += 4

  parsedPacket.members = []

  // Populate Members
  if (parsedPacket.memberCount) {
    for (let i = 0; i < parsedPacket.memberCount; i++) {
      const startOffset = offset
      const member: Member = {
        name: "",
        GUID: null
        // role: 0,
        // status: 0,
        // subGroup: 1,
        // updateFlags: 0
      }

      for (let k = startOffset; k < packet.length; k++) {
        if (packet[k] === 0 && packet[k + 1] !== 0) {
          member.name = buff2Str(packet.slice(offset, k))
          offset += k - offset + 1
          break
        }
      }

      member.GUID = packet.slice(offset, offset + 8)
      offset += 8

      //member.status = packet.readUInt8(offset)
      offset++

      //member.subGroup = packet.readUInt8(offset) + 1
      offset++

      //member.updateFlags = packet.readUInt8(offset)
      offset++

      //member.role = packet.readUInt8(offset)
      offset++

      parsedPacket.members.push(member)
    }
  }

  parsedPacket.leaderGUID = packet.slice(offset, offset + 8)
  offset += 8

  parsedPacket.lootMethod = packet.readUInt8(offset)
  offset++

  parsedPacket.looterGUID = packet.slice(offset, offset + 8)
  offset += 8

  parsedPacket.lootTreshold = packet.readUInt8(offset)
  offset++

  parsedPacket.dungeonDifficulty = packet.readUInt8(offset)
  offset++

  parsedPacket.raidDifficulty = packet.readUInt8(offset)
  offset++

  // Unknown Byte
  parsedPacket.unknownByte = packet.readUInt8(offset)

  return parsedPacket
}
