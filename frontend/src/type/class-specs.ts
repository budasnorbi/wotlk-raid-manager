import { PowerTypes, Specs } from "./trinity-types"

export const ClassSpecs = {
  55050: Specs.DeathKnightBlood,
  49184: Specs.DeathKnightFrost,
  49206: Specs.DeathKnightUnholy,
  48505: Specs.DruidBalance,
  57877: Specs.DruidFeralTank,
  50334: Specs.DruidFeralDps,
  48438: Specs.DruidRestoration,
  53270: Specs.HunterBeastMastery,
  53209: Specs.HunterMarksmanship,
  53301: Specs.HunterSurvival,
  44425: Specs.MageArcane,
  44457: Specs.MageFire,
  44572: Specs.MageFrost,
  53563: Specs.PaladinHoly,
  53595: Specs.PaladinProtection,
  53385: Specs.PaladinRetribution,
  47540: Specs.PriestDiscipline,
  47788: Specs.PriestHoly,
  47585: Specs.PriestShadow,
  51662: Specs.RogueAssassination,
  51690: Specs.RogueCombat,
  51713: Specs.RogueSubtlety,
  51490: Specs.ShamanElemental,
  51333: Specs.ShamanEnhancement,
  61295: Specs.ShamanRestoration,
  48181: Specs.WarlockAffliction,
  59672: Specs.WarlockDemonology,
  50796: Specs.WarlockDestruction,
  46924: Specs.WarriorArms,
  46917: Specs.WarriorFury,
  46968: Specs.WarriorProtection
}

export const tankSpecs: Specs[] = [
  Specs.DeathKnightBlood,
  Specs.DruidFeralTank,
  Specs.PaladinProtection,
  Specs.WarriorProtection
]

export const healSpecs: Specs[] = [
  Specs.DruidRestoration,
  Specs.PaladinHoly,
  Specs.PriestDiscipline,
  Specs.PriestHoly,
  Specs.ShamanRestoration
]

export const MeeleDpsSpecs: Specs[] = [
  Specs.DeathKnightFrost,
  Specs.DeathKnightUnholy,
  Specs.DruidFeralDps,
  Specs.PaladinRetribution,
  Specs.RogueAssassination,
  Specs.RogueCombat,
  Specs.RogueSubtlety,
  Specs.ShamanEnhancement,
  Specs.WarriorArms,
  Specs.WarriorFury
]

export const RangedDpsSpecs: Specs[] = [
  Specs.DruidBalance,
  Specs.HunterBeastMastery,
  Specs.HunterMarksmanship,
  Specs.HunterSurvival,
  Specs.MageArcane,
  Specs.MageFire,
  Specs.MageFrost,
  Specs.PriestShadow,
  Specs.WarlockAffliction,
  Specs.WarlockDemonology,
  Specs.WarlockDestruction,
  Specs.ShamanElemental
]

export const blacklistedStats = [
  PowerTypes.ITEM_MOD_SPELL_PENETRATION,
  PowerTypes.ITEM_MOD_RESILIENCE_RATING
]

export const DeathKnightPowerTypes = {
  [Specs.DeathKnightBlood]: {
    whitelisted: [
      PowerTypes.ITEM_MOD_STAMINA,
      PowerTypes.ITEM_MOD_STRENGTH,
      PowerTypes.ITEM_MOD_DEFENSE_SKILL_RATING,
      PowerTypes.ITEM_MOD_DODGE_RATING,
      PowerTypes.ITEM_MOD_PARRY_RATING,
      PowerTypes.ITEM_MOD_BLOCK_RATING
    ],
    blacklisted: [
      PowerTypes.ITEM_MOD_MANA,
      PowerTypes.ITEM_MOD_INTELLECT,
      PowerTypes.ITEM_MOD_SPIRIT,
      PowerTypes.ITEM_MOD_MANA_REGENERATION,
      PowerTypes.ITEM_MOD_SPELL_POWER
    ]
  },
  [Specs.DeathKnightFrost]: {
    whitelisted: [
      PowerTypes.ITEM_MOD_STRENGTH,
      PowerTypes.ITEM_MOD_HIT_RATING,
      PowerTypes.ITEM_MOD_CRIT_RATING,
      PowerTypes.ITEM_MOD_HASTE_RATING,
      PowerTypes.ITEM_MOD_EXPERTISE_RATING,
      PowerTypes.ITEM_MOD_ARMOR_PENETRATION_RATING
    ]
  },
  [Specs.DeathKnightUnholy]: {
    whitelisted: [
      PowerTypes.ITEM_MOD_STRENGTH,
      PowerTypes.ITEM_MOD_HIT_RATING,
      PowerTypes.ITEM_MOD_CRIT_RATING,
      PowerTypes.ITEM_MOD_HASTE_RATING,
      PowerTypes.ITEM_MOD_EXPERTISE_RATING,
      PowerTypes.ITEM_MOD_ARMOR_PENETRATION_RATING
    ]
  }
}

export const PriestPowerTypes = {
  [Specs.PriestDiscipline]: {
    whitelisted: [
      PowerTypes.ITEM_MOD_SPELL_POWER,
      PowerTypes.ITEM_MOD_HASTE_RATING,
      PowerTypes.ITEM_MOD_CRIT_RATING,
      PowerTypes.ITEM_MOD_INTELLECT,
      PowerTypes.ITEM_MOD_MANA_REGENERATION,
      PowerTypes.ITEM_MOD_SPIRIT,
      PowerTypes.ITEM_MOD_STAMINA,
      PowerTypes.ITEM_MOD_MANA
    ],
    blacklisted: [
      PowerTypes.ITEM_MOD_BLOCK_VALUE,
      PowerTypes.ITEM_MOD_HEALTH_REGEN,
      PowerTypes.ITEM_MOD_ARMOR_PENETRATION_RATING,
      PowerTypes.ITEM_MOD_ATTACK_POWER,
      PowerTypes.ITEM_MOD_EXPERTISE_RATING,
      PowerTypes.ITEM_MOD_HIT_RATING,
      PowerTypes.ITEM_MOD_BLOCK_RATING,
      PowerTypes.ITEM_MOD_PARRY_RATING,
      PowerTypes.ITEM_MOD_DODGE_RATING,
      PowerTypes.ITEM_MOD_DEFENSE_SKILL_RATING,
      PowerTypes.ITEM_MOD_STRENGTH,
      PowerTypes.ITEM_MOD_AGILITY
    ]
  },
  [Specs.PriestHoly]: {
    whitelisted: [
      PowerTypes.ITEM_MOD_SPELL_POWER,
      PowerTypes.ITEM_MOD_HASTE_RATING,
      PowerTypes.ITEM_MOD_CRIT_RATING,
      PowerTypes.ITEM_MOD_INTELLECT,
      PowerTypes.ITEM_MOD_MANA_REGENERATION,
      PowerTypes.ITEM_MOD_SPIRIT,
      PowerTypes.ITEM_MOD_STAMINA,
      PowerTypes.ITEM_MOD_MANA
    ],
    blacklisted: [
      PowerTypes.ITEM_MOD_BLOCK_VALUE,
      PowerTypes.ITEM_MOD_HEALTH_REGEN,
      PowerTypes.ITEM_MOD_ARMOR_PENETRATION_RATING,
      PowerTypes.ITEM_MOD_ATTACK_POWER,
      PowerTypes.ITEM_MOD_EXPERTISE_RATING,
      PowerTypes.ITEM_MOD_HIT_RATING,
      PowerTypes.ITEM_MOD_BLOCK_RATING,
      PowerTypes.ITEM_MOD_PARRY_RATING,
      PowerTypes.ITEM_MOD_DODGE_RATING,
      PowerTypes.ITEM_MOD_DEFENSE_SKILL_RATING,
      PowerTypes.ITEM_MOD_STRENGTH,
      PowerTypes.ITEM_MOD_AGILITY
    ]
  },
  [Specs.PriestShadow]: {
    whitelisted: [
      PowerTypes.ITEM_MOD_SPELL_POWER,
      PowerTypes.ITEM_MOD_HASTE_RATING,
      PowerTypes.ITEM_MOD_CRIT_RATING,
      PowerTypes.ITEM_MOD_INTELLECT,
      PowerTypes.ITEM_MOD_SPIRIT,
      PowerTypes.ITEM_MOD_STAMINA,
      PowerTypes.ITEM_MOD_MANA
    ],
    blacklisted: [
      PowerTypes.ITEM_MOD_BLOCK_VALUE,
      PowerTypes.ITEM_MOD_HEALTH_REGEN,
      PowerTypes.ITEM_MOD_ARMOR_PENETRATION_RATING,
      PowerTypes.ITEM_MOD_ATTACK_POWER,
      PowerTypes.ITEM_MOD_EXPERTISE_RATING,
      PowerTypes.ITEM_MOD_HIT_RATING,
      PowerTypes.ITEM_MOD_BLOCK_RATING,
      PowerTypes.ITEM_MOD_PARRY_RATING,
      PowerTypes.ITEM_MOD_DODGE_RATING,
      PowerTypes.ITEM_MOD_DEFENSE_SKILL_RATING,
      PowerTypes.ITEM_MOD_STRENGTH,
      PowerTypes.ITEM_MOD_AGILITY,
      PowerTypes.ITEM_MOD_MANA_REGENERATION
    ]
  }
}
