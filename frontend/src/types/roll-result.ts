import { DestructedItem } from "./item"

export interface RollResult {
  item: DestructedItem
  isRollFinished: boolean
  rolledMembers: {
    roll: number
    GUID: Buffer
    equippedItem: DestructedItem | null
    name: string
  }[]
}
