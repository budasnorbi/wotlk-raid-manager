import { DestructedItem } from "./item"

export interface RollResult {
  item: DestructedItem
  rolledMembers: {
    roll: number
    GUID: Buffer
    item: DestructedItem | null
    name: string
  }[]
}
