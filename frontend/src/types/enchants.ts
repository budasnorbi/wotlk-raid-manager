import { PowerTypes } from "./power-types"

export interface Enchant {
  itemId: number
  enchantId: number
  enchantDescription: string
  power1MinVal: number
  power2MinVal: number
  power3MinVal: number
  power1MaxVal: number
  power2MaxVal: number
  power3MaxVal: number
  power1Type: PowerTypes
  power2Type: PowerTypes
  power3Type: PowerTypes
}
