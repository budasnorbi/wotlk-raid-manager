import { Raid, RollType } from "./parsers-types"
import { CharacterInfo, DestructedItem, ItemWithGemsEnchant } from "./scraped-types"
import { LootMethod, LootTreshold, RaidDifficulty } from "./trinity-types"

export type PARTY_GROUP_CONVERTED_TO_RAID = Raid
export interface PLAYER_JOINED_TO_THE_RAID {
  GUID: Buffer
  name: string
  characterInfo: CharacterInfo
}
export interface PLAYER_LEAVED_THE_RAID {
  name: string
}
export interface RAID_LEADER_UPDATED {
  name: string
}
export interface RAID_DIFFICULTY_UPDATED {
  raidDifficulty: RaidDifficulty
}
export interface RAID_LOOTMETHOD_UPDATED {
  lootMethod: LootMethod
}
export interface RAID_LOOT_TRESHOLD_UPDATED {
  treshold: LootTreshold
}
export interface RAID_ROLL_STARTED {
  item: DestructedItem
  type: RollType
}
export interface RAID_ROLL_ENDED {
  winnerRoll: number
  winnerName: string
}
export interface RAID_PLAYER_ROLLED {
  item: ItemWithGemsEnchant
  name: string
  GUID: Buffer
  roll: number
}

interface ErroResponse {
  error: string
}
export type RAID_NO_LEADER_ERROR = ErroResponse
export type RAID_NO_ITEMID_IN_CHAT_ERROR = ErroResponse
export type RAID_NO_ROLL_MEMBER_INFO_ERROR = ErroResponse
export type RAID_NO_CHARACTER_ITEM_SLOT_INDEX_ERROR = ErroResponse
