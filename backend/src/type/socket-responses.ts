import { Raid, RollType } from "./parsers-types"
import { DestructedItem, ItemWithGemsEnchant } from "./scraped-types"

export type PARTY_GROUP_CONVERTED_TO_RAID = Raid
export type PLAYER_JOINED_TO_THE_RAID = Raid
export type PLAYER_LEAVED_THE_RAID = Raid
export type RAID_LEADER_UPDATED = Raid
export type RAID_DIFFICULTY_UPDATED = Raid
export type RAID_LOOTMETHOD_UPDATED = Raid
export type RAID_LOOT_TRESHOLD_UPDATED = Raid
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
