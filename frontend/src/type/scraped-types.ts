import { Classes, DBItem, PowerTypes, Specs } from "./trinity-types"

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

export interface Gem {
  itemId: number
  name: string
  gemEnchantId: number
  power1MinVal: number
  power2MinVal: number
  power3MinVal: number
  power1MaxVal: number
  power2MaxVal: number
  power3MaxVal: number
  power1Type: number
  power2Type: number
  power3Type: number
}

export interface Glyph {
  entry: number
  spellId: number
  name: string
  description: string
}

export interface DestructedItem {
  entry: DBItem["entry"]
  name: DBItem["name"]
  itemClass: DBItem["class"]
  itemSubClass: DBItem["subclass"]
  quality: DBItem["Quality"]
  inventoryType: DBItem["InventoryType"]
  itemLevel: DBItem["ItemLevel"]
  statsCount: DBItem["StatsCount"]
  statType1: DBItem["stat_type1"]
  statValue1: DBItem["stat_value1"]
  statType2: DBItem["stat_type2"]
  statValue2: DBItem["stat_value2"]
  statType3: DBItem["stat_type3"]
  statValue3: DBItem["stat_value3"]
  statType4: DBItem["stat_type4"]
  statValue4: DBItem["stat_value4"]
  statType5: DBItem["stat_type5"]
  statValue5: DBItem["stat_value5"]
  statType6: DBItem["stat_type6"]
  statValue6: DBItem["stat_value6"]
  statType7: DBItem["stat_type7"]
  statValue7: DBItem["stat_value7"]
  statType8: DBItem["stat_type8"]
  statValue8: DBItem["stat_value8"]
  statType9: DBItem["stat_type9"]
  statValue9: DBItem["stat_value9"]
  statType10: DBItem["stat_type10"]
  statValue10: DBItem["stat_value10"]
  dmgMin1: DBItem["dmg_min1"]
  dmgMax1: DBItem["dmg_max1"]
  dmgType1: DBItem["dmg_type1"]
  dmgMin2: DBItem["dmg_min2"]
  dmgMax2: DBItem["dmg_max2"]
  dmgType2: DBItem["dmg_type2"]
  armor: DBItem["armor"]
  holyRes: DBItem["holy_res"]
  fireRes: DBItem["fire_res"]
  natureRes: DBItem["nature_res"]
  frostRes: DBItem["frost_res"]
  shadowRes: DBItem["shadow_res"]
  arcaneRes: DBItem["arcane_res"]
  material: DBItem["Material"]
  block: DBItem["block"]
  socketColor1: DBItem["socketColor_1"]
  socketContent1: DBItem["socketContent_1"]
  socketColor2: DBItem["socketColor_2"]
  socketContent2: DBItem["socketContent_2"]
  socketColor3: DBItem["socketColor_3"]
  socketContent3: DBItem["socketContent_3"]
  socketBonus: DBItem["socketBonus"]
  itemset: DBItem["itemset"]
}

export interface ItemWithGemsEnchant {
  item: DestructedItem | null
  enchant?: Enchant | null
  gems?: Gem[]
}

export interface DetailedItem {
  item: DBItem
  enchant?: DBItem
  gems?: DBItem[]
}

export interface CharacterInfo {
  classId: Classes
  items: ItemWithGemsEnchant[]
  achievements: number[]
  primaryTalents: number[]
  primaryTalentsSpecId: Specs | null
  primaryGlyphs: Glyph[]
  secondaryTalents: number[]
  secondaryGlyphs: Glyph[]
  secondaryTalentsSpecId: Specs | null
  activeTalentIndex: number
}
