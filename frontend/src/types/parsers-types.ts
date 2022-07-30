import {
  ChatType,
  DungeonDifficulty,
  GroupType,
  Language,
  LootMethod,
  LootTreshold,
  Opcodes,
  RaidDifficulty
} from "./trinity-types"
import { CharacterInfo, DestructedItem } from "./scraped-types"

export interface SMSG_GROUP_LIST_RETURN {
  groupType: GroupType
  subGroup: number
  flags: number
  playerRolesAssigned: number
  groupGUID: Buffer | null
  counter: number
  memberCount: number
  members: {
    name: string
    GUID: Buffer
    role: number
    status: number
    subGroup: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    updateFlags: number
  }[]
  leaderGUID: Buffer | null
  lootMethod: LootMethod
  looterGUID: Buffer | null
  lootTreshold: LootTreshold
  dungeonDifficulty: DungeonDifficulty
  raidDifficulty: RaidDifficulty
  unknownByte: number
}

export interface Member {
  name: string | null
  GUID: Buffer
  characterInfo: CharacterInfo | null
}

export type RollType = "os" | "ms"

export interface Raid
  extends Pick<
    SMSG_GROUP_LIST_RETURN,
    "groupType" | "memberCount" | "raidDifficulty" | "lootTreshold" | "lootMethod" | "leaderGUID"
  > {
  leaderName: string
  leaderCharacterInfo: CharacterInfo
  members: Member[]
}

export interface RollResult {
  item: DestructedItem
  rolledMembers: {
    roll: number
    GUID: Buffer
    item: DestructedItem | null
    name: string
  }[]
}

export interface MSG_RANDOM_ROLL_RETURN {
  min: number
  max: number
  roll: number
  GUID: Buffer
}

export interface SMSG_NAME_QUERY_RESPONSE_RETURN {
  name: string
  GUID: Buffer
}

export interface SMSG_MESSAGECHAT_RETURN {
  type: ChatType
  language: Language
  senderGUID: Buffer
  receiverGUID: Buffer
  messageLength: number
  message: string
  chatTag: number
}

export interface MSG_RANDOM_ROLL_RETURN {
  min: number
  max: number
  roll: number
  GUID: Buffer
}

export interface SMSG_MESSAGECHAT_RETURN {
  type: ChatType
  language: Language
  senderGUID: Buffer
  receiverGUID: Buffer
  messageLength: number
  message: string
  chatTag: number
}

export type ImplementedOpcodes =
  | Opcodes.MSG_RANDOM_ROLL
  | Opcodes.SMSG_GROUP_LIST
  | Opcodes.SMSG_MESSAGECHAT
  | Opcodes.SMSG_NAME_QUERY_RESPONSE
