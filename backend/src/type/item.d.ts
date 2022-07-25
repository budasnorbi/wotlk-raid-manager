import { Enchant } from "./enchants"
import { Gem } from "./gems"

export interface Item {
  item: Optional<DBItem>
  enchant?: Enchant
  gems?: Gem[]
}

export interface DetailedItem {
  item: DBItem
  enchant?: DBItem
  gems?: DBItem[]
}

export enum ItemQuality {
  poor = 0,
  common = 1,
  uncommon = 2,
  rare = 3,
  epic = 4,
  legendary = 5,
  artifact = 6,
  bindToAccount = 7
}

export enum InventoryType {
  head = 1,
  neck = 2,
  shoulder = 3,
  chest = 5,
  waist = 6,
  legs = 7,
  feet = 8,
  wrists = 9,
  hands = 10,
  finger = 11,
  trinket = 12,
  weapon = 13,
  shield = 14,
  ranged = 15,
  back = 16,
  twoHand = 17,
  mainHand = 21,
  offHand = 22,
  thrown = 25,
  rangedRight = 26,
  relic = 28
}

export enum StatType {
  ITEM_MOD_MANA = 0,
  ITEM_MOD_HEALTH = 1,
  ITEM_MOD_AGILITY = 3,
  ITEM_MOD_STRENGTH = 4,
  ITEM_MOD_INTELLECT = 5,
  ITEM_MOD_SPIRIT = 6,
  ITEM_MOD_STAMINA = 7,
  ITEM_MOD_DEFENSE_SKILL_RATING = 12,
  ITEM_MOD_DODGE_RATING = 13,
  ITEM_MOD_PARRY_RATING = 14,
  ITEM_MOD_BLOCK_RATING = 15,
  ITEM_MOD_HIT_MELEE_RATING = 16,
  ITEM_MOD_HIT_RANGED_RATING = 17,
  ITEM_MOD_HIT_SPELL_RATING = 18,
  ITEM_MOD_CRIT_MELEE_RATING = 19,
  ITEM_MOD_CRIT_RANGED_RATING = 20,
  ITEM_MOD_CRIT_SPELL_RATING = 21,
  ITEM_MOD_HIT_TAKEN_MELEE_RATING = 22,
  ITEM_MOD_HIT_TAKEN_RANGED_RATING = 23,
  ITEM_MOD_HIT_TAKEN_SPELL_RATING = 24,
  ITEM_MOD_CRIT_TAKEN_MELEE_RATING = 25,
  ITEM_MOD_CRIT_TAKEN_RANGED_RATING = 26,
  ITEM_MOD_CRIT_TAKEN_SPELL_RATING = 27,
  ITEM_MOD_HASTE_MELEE_RATING = 28,
  ITEM_MOD_HASTE_RANGED_RATING = 29,
  ITEM_MOD_HASTE_SPELL_RATING = 30,
  ITEM_MOD_HIT_RATING = 31,
  ITEM_MOD_CRIT_RATING = 32,
  ITEM_MOD_HIT_TAKEN_RATING = 33,
  TEM_MOD_CRIT_TAKEN_RATING = 34,
  ITEM_MOD_RESILIENCE_RATING = 35,
  ITEM_MOD_HASTE_RATING = 36,
  ITEM_MOD_EXPERTISE_RATING = 37,
  ITEM_MOD_ATTACK_POWER = 38,
  ITEM_MOD_RANGED_ATTACK_POWER = 39,
  ITEM_MOD_FERAL_ATTACK_POWER = 40,
  ITEM_MOD_SPELL_HEALING_DONE = 41,
  ITEM_MOD_SPELL_DAMAGE_DONE = 42,
  ITEM_MOD_MANA_REGENERATION = 43,
  ITEM_MOD_ARMOR_PENETRATION_RATING = 44,
  ITEM_MOD_SPELL_POWER = 45,
  ITEM_MOD_HEALTH_REGEN = 46,
  ITEM_MOD_SPELL_PENETRATION = 47,
  ITEM_MOD_BLOCK_VALUE = 48
}

export enum ItemDamageType {
  physical = 0,
  holy = 1,
  fire = 2,
  nature = 3,
  frost = 4,
  shadow = 5,
  arcane = 6
}

export enum SocketColor {
  meta = 1,
  red = 2,
  yellow = 4,
  blue = 8
}

export enum ItemMaterial {
  consumables = -1,
  notDefined = 0,
  metal = 1,
  wood = 2,
  liquid = 3,
  jewelry = 4,
  mail = 5,
  plate = 6,
  cloth = 7,
  leather = 8
}

export interface DBItem {
  entry: number
  class: number
  subclass: number
  SoundOverrideSubclass: number
  name: string
  displayid: number
  Quality: ItemQuality
  Flags: number
  FlagsExtra: number
  BuyCount: number
  BuyPrice: number
  SellPrice: number
  InventoryType: InventoryType
  AllowableClass: number
  AllowableRace: number
  ItemLevel: number
  RequiredLevel: number
  RequiredSkill: number
  RequiredSkillRank: number
  requiredspell: number
  requiredhonorrank: number
  RequiredCityRank: number
  RequiredReputationFaction: number
  RequiredReputationRank: number
  maxcount: number
  stackable: number
  ContainerSlots: number
  StatsCount: number
  stat_type1: StatType
  stat_value1: number
  stat_type2: StatType
  stat_value2: number
  stat_type3: StatType
  stat_value3: number
  stat_type4: StatType
  stat_value4: number
  stat_type5: StatType
  stat_value5: number
  stat_type6: StatType
  stat_value6: number
  stat_type7: StatType
  stat_value7: number
  stat_type8: StatType
  stat_value8: number
  stat_type9: StatType
  stat_value9: number
  stat_type10: StatType
  stat_value10: number
  ScalingStatDistribution: number
  ScalingStatValue: number
  dmg_min1: number
  dmg_max1: number
  dmg_type1: ItemDamageType
  dmg_min2: number
  dmg_max2: number
  dmg_type2: ItemDamageType
  armor: number
  holy_res: number
  fire_res: number
  nature_res: number
  frost_res: number
  shadow_res: number
  arcane_res: number
  delay: number
  ammo_type: number
  RangedModRange: number
  spellid_1: number
  spelltrigger_1: number
  spellcharges_1: number
  spellppmRate_1: number
  spellcooldown_1: 1000
  spellcategory_1: number
  spellcategorycooldown_1: number
  spellid_2: number
  spelltrigger_2: number
  spellcharges_2: number
  spellppmRate_2: number
  spellcooldown_2: number
  spellcategory_2: number
  spellcategorycooldown_2: number
  spellid_3: number
  spelltrigger_3: number
  spellcharges_3: number
  spellppmRate_3: number
  spellcooldown_3: number
  spellcategory_3: number
  spellcategorycooldown_3: number
  spellid_4: number
  spelltrigger_4: number
  spellcharges_4: number
  spellppmRate_4: number
  spellcooldown_4: number
  spellcategory_4: number
  spellcategorycooldown_4: number
  spellid_5: number
  spelltrigger_5: number
  spellcharges_5: number
  spellppmRate_5: number
  spellcooldown_5: number
  spellcategory_5: number
  spellcategorycooldown_5: number
  bonding: number
  description: string
  PageText: number
  LanguageID: number
  PageMaterial: number
  startquest: number
  lockid: number
  Material: ItemMaterial
  sheath: number
  RandomProperty: number
  RandomSuffix: number
  block: number
  itemset: number
  MaxDurability: number
  area: number
  Map: number
  BagFamily: number
  TotemCategory: number
  socketColor_1: SocketColor
  socketContent_1: number
  socketColor_2: SocketColor
  socketContent_2: number
  socketColor_3: SocketColor
  socketContent_3: number
  socketBonus: number
  GemProperties: number
  RequiredDisenchantSkill: number
  ArmorDamageModifier: number
  duration: number
  ItemLimitCategory: number
  HolidayId: number
  ScriptName: string
  DisenchantID: number
  FoodType: number
  minMoneyLoot: number
  maxMoneyLoot: number
  flagsCustom: number
  VerifiedBuild: 12340
}
