import { Injectable } from "@nestjs/common"

import { Opcodes, OpcodeValues } from "@type/opcodes"
import { buff2Str } from "../../helpers/buff2str"
import { Member, Raid } from "@type/raid"

@Injectable()
export class ParserService {
  private printPacket(opCode: OpcodeValues, packetData: Buffer) {
    const findedOpcode = Object.entries(Opcodes).filter((entry) => {
      return entry[1] === opCode
    })[0]

    console.log(`${findedOpcode[0]}`, packetData.toString("hex").match(/../g).join(" "))
  }

  private parseGUID(parser: Buffer) {
    // const mask = parser.uint8().toString(2);

    // const guidLength = mask.match(/1/g).length;
    // const GUIDBuff = parser.subArray(guidLength);

    // let lowGUIDEndIndex = 0;
    // for (let i = mask.length - 1; i >= 0; i--) {
    //   if (mask[i] === "0") {
    //     break;
    //   }
    //   lowGUIDEndIndex++;
    // }

    // console.log(GUIDBuff);

    // const lowGUIDBuff = GUIDBuff.subArray(lowGUIDEndIndex);
    // const lowGUID = lowGUIDBuff.uintLE(lowGUIDBuff.length());

    // const entryIDBuff = GUIDBuff.subArray(-2);
    // const entryID = entryIDBuff.uintLE(entryIDBuff.length());

    // const hightGUIDBuff = GUIDBuff.subArray(-2);
    // const highGUID = hightGUIDBuff.uintLE(hightGUIDBuff.length());

    return {
      // lowGUID,
      // entryID,
      // highGUID,
    }
  }

  private SMSG_SPELL_START(packet: Buffer) {
    const payload: { CasterGUID: any } = { CasterGUID: {} }

    // // CASTER SLICE
    payload.CasterGUID = this.parseGUID(packet)

    //console.log(payload);
    // offset = payload.CasterGUID.currentOffset;
    // // console.log(offset);

    // // SPELLINFO SLICE
    // payload.CasterUnit = this.parseGUID(buffer, offset);
    // offset = payload.CasterUnit.currentOffset;

    // payload.castID = buffer.readUint8(offset);
    // offset += 1;

    // payload.spellID = buffer.readUint32LE(offset);
    // offset += 4;

    // payload.castFlags = buffer.readUint32LE(offset);
    // offset += 4;

    // payload.castTime = buffer.readUint32LE(offset);
    // offset += 4;

    // // TARGET SLICE
    // payload.targetType = buffer.readUint32LE(offset);
    // offset += 4;

    // console.log(buffer);
    // //console.log(payload);
    // console.log("Rest data: ", buffer.length - offset);

    //console.log(payload);
  }

  SMSG_GROUP_LIST(packet: Buffer, cb: (data: Raid | null) => void) {
    let offset = 0

    const raid: Raid = {
      groupType: 0,
      subGroup: 0,
      flags: 0,
      playerRolesAssigned: 0,
      // groupGUID: Buffer.alloc(0),
      counter: 0,
      memberCount: 0,
      members: [],
      // leaderGUID: 0,
      lootMethod: 0,
      // looterGUID: 0,
      lootTreshold: 0,
      dungeonDifficulty: 0,
      raidDifficulty: 0
    }

    raid.groupType = packet.readUInt8(0)
    offset++

    if (raid.groupType !== 2) {
      cb(null)
      return
    }

    raid.subGroup = packet.readUInt8(offset)
    offset++

    raid.flags = packet.readUInt8(offset)
    offset++

    raid.playerRolesAssigned = packet.readUInt8(offset)
    offset++

    // raid.groupGUID = packet.slice(offset, 8);
    offset += 8

    raid.counter = packet.readUInt32LE(offset)
    offset += 4

    raid.memberCount = packet.readUInt32LE(offset)
    offset += 4

    raid.members = []

    // Populate members
    if (raid.memberCount) {
    }
    for (let i = 0; i < raid.memberCount; i++) {
      const startOffset = offset
      const member: Member = {
        name: "",
        // GUID: Buffer.alloc(0),
        role: 0,
        status: 0,
        subGroup: 1,
        updateFlags: 0
      }

      for (let k = startOffset; k < packet.length; k++) {
        if (packet[k] === 0 && packet[k + 1] !== 0) {
          member.name = buff2Str(packet.slice(offset, k))
          offset += k - offset + 1
          break
        }
      }

      // member.GUID = packet.slice(offset, 8);
      offset += 8

      member.status = packet.readUInt8(offset)
      offset++

      member.subGroup = packet.readUInt8(offset) + 1
      offset++

      member.updateFlags = packet.readUInt8(offset)
      offset++

      member.role = packet.readUInt8(offset)
      offset++

      raid.members.push(member)
    }

    // raid.leaderGUID = packet.slice(offset, 8);
    offset += 8

    raid.lootMethod = packet.readUInt8(offset)
    offset++

    // raid.looterGUID = packet.slice(offset, 8);
    offset += 8

    raid.lootTreshold = packet.readUInt8(offset)
    offset++

    raid.dungeonDifficulty = packet.readUInt8(offset)
    offset++

    raid.raidDifficulty = packet.readUInt8(offset)
    offset++

    // Unknown Byte
    // packet.readUInt8(offset);
    cb(raid)
  }
}
