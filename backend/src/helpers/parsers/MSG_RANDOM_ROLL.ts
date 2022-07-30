import { MSG_RANDOM_ROLL_RETURN } from "@type/parsers-types"

export const PARSE_MSG_RANDOM_ROLL = (packet: Buffer): MSG_RANDOM_ROLL_RETURN => {
  if (packet.length === 8) {
    return null
  }

  let offset = 0
  const minRoll = packet.readInt32LE(offset)
  offset += 4

  const maxRoll = packet.readInt32LE(offset)
  offset += 4

  const rollValue = packet.readInt32LE(offset)
  offset += 4

  const GUID = packet.slice(offset, offset + 8)
  return { min: minRoll, max: maxRoll, roll: rollValue, GUID }
}
