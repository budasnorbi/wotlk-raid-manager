import { Injectable } from "@nestjs/common"
import { Classes } from "@type/classes"
import { DBItem, Item } from "@type/item"
import { JSDOM } from "jsdom"
import fetch from "node-fetch"
import * as asyncFs from "fs/promises"
import { dirname } from "path"
import { Gem } from "@type/gems"
import { Enchant } from "@type/enchants"
import { Achievements } from "@type/achievements"
import { Glyph } from "@type/glyphs"
import { ClassSpecs, Specs } from "@type/class-specs"
import { ItemSet } from "@type/item-sets"
const appDir = dirname(require.main.filename)

@Injectable()
export class CharacterInfoService {
  gems: Gem[]
  enchants: Enchant[]
  items: DBItem[]
  achievements: Achievements
  glyphs: Glyph[]
  itemSets: ItemSet[]

  constructor() {
    this.loadItemSets()
    this.loadGlyphsDB()
    this.loadAchievementsDB()
    this.loadGemsDB()
    this.loadEnchantsDB()
    this.loadItemsDB()
  }

  async loadItemSets() {
    this.itemSets = JSON.parse(
      (await asyncFs.readFile(`${appDir}/../data/item_sets.json`)).toString()
    )
  }

  async loadGlyphsDB() {
    this.glyphs = JSON.parse((await asyncFs.readFile(`${appDir}/../data/glyphs.json`)).toString())
  }

  async loadAchievementsDB() {
    this.achievements = JSON.parse(
      (await asyncFs.readFile(`${appDir}/../data/achievements.json`)).toString()
    )
  }

  async loadGemsDB() {
    this.gems = JSON.parse((await asyncFs.readFile(`${appDir}/../data/gems.json`)).toString())
  }

  async loadEnchantsDB() {
    this.enchants = JSON.parse(
      (await asyncFs.readFile(`${appDir}/../data/enchants.json`)).toString()
    )
  }

  async loadItemsDB() {
    this.items = JSON.parse(
      (
        await asyncFs.readFile(`${appDir}/../data/weapons_armors_glyphs_gems_enchants.json`)
      ).toString()
    )
  }

  public async getCharacterInfo(name: string) {
    const profilePage = await fetch(`http://armory.warmane.com/character/${name}/Icecrown/profile`)
      .then((res) => res.text())
      .then((htmlStr: string) => new JSDOM(htmlStr).window.document)

    const classText = profilePage
      .querySelector<HTMLDivElement>(".level-race-class")
      .textContent.replace("Level ", "")
      .replace(/\d/g, "")
      .trim()
      .replace(", Icecrown", "")
      .toLowerCase()

    let classId: Classes = Classes.unknown

    if (classText.includes(Classes[Classes.warrior])) {
      classId = Classes.warrior
    } else if (classText.includes(Classes[Classes.paladin])) {
      classId = Classes.paladin
    } else if (classText.includes(Classes[Classes.hunter])) {
      classId = Classes.hunter
    } else if (classText.includes(Classes[Classes.rogue])) {
      classId = Classes.rogue
    } else if (classText.includes(Classes[Classes.priest])) {
      classId = Classes.priest
    } else if (classText.includes("death knight")) {
      classId = Classes.deathknight
    } else if (classText.includes(Classes[Classes.shaman])) {
      classId = Classes.shaman
    } else if (classText.includes(Classes[Classes.mage])) {
      classId = Classes.mage
    } else if (classText.includes(Classes[Classes.warlock])) {
      classId = Classes.warlock
    } else if (classText.includes(Classes[Classes.druid])) {
      classId = Classes.druid
    }

    const items = [...profilePage.querySelectorAll<HTMLAnchorElement>(".item-model .item-slot a")]
      // Filter tabard and shirt
      .filter((_, index) => index !== 5 && index !== 6)
      .map((anchorNode: HTMLAnchorElement) => {
        const returnObj: Item = { item: null, gems: null, enchant: null }
        const splittedItemStr = anchorNode.rel.split("&")

        if (splittedItemStr[0]?.includes("item")) {
          const itemId = parseInt(splittedItemStr[0].replace("item=", ""))
          const item = this.items.find((item) => item.entry === itemId)

          if (item) {
            const {
              entry,
              name,
              ItemLevel: itemLevel,
              class: itemClass,
              subclass: itemSubClass,
              Quality: quality,
              InventoryType: inventoryType,
              StatsCount: statsCount,
              stat_type1: statType1,
              stat_value1: statValue1,
              stat_type2: statType2,
              stat_value2: statValue2,
              stat_type3: statType3,
              stat_value3: statValue3,
              stat_type4: statType4,
              stat_value4: statValue4,
              stat_type5: statType5,
              stat_value5: statValue5,
              stat_type6: statType6,
              stat_value6: statValue6,
              stat_type7: statType7,
              stat_value7: statValue7,
              stat_type8: statType8,
              stat_value8: statValue8,
              stat_type9: statType9,
              stat_value9: statValue9,
              stat_type10: statType10,
              stat_value10: statValue10,
              dmg_min1: dmgMin1,
              dmg_max1: dmgMax1,
              dmg_type1: dmgType1,
              dmg_min2: dmgMin2,
              dmg_max2: dmgMax2,
              dmg_type2: dmgType2,
              armor,
              holy_res: holyRes,
              fire_res: fireRes,
              nature_res: natureRes,
              frost_res: frostRes,
              shadow_res: shadowRes,
              arcane_res: arcaneRes,
              Material: material,
              block,
              itemset,
              socketColor_1: socketColor1,
              socketContent_1: socketContent1,
              socketColor_2: socketColor2,
              socketContent_2: socketContent2,
              socketColor_3: socketColor3,
              socketContent_3: socketContent3,
              socketBonus
            } = item
            returnObj.item = {
              entry,
              name,
              itemClass,
              itemSubClass,
              quality,
              inventoryType,
              itemLevel,
              statsCount,
              statType1,
              statValue1,
              statType2,
              statValue2,
              statType3,
              statValue3,
              statType4,
              statValue4,
              statType5,
              statValue5,
              statType6,
              statValue6,
              statType7,
              statValue7,
              statType8,
              statValue8,
              statType9,
              statValue9,
              statType10,
              statValue10,
              dmgMin1,
              dmgMax1,
              dmgType1,
              dmgMin2,
              dmgMax2,
              dmgType2,
              armor,
              holyRes,
              fireRes,
              natureRes,
              frostRes,
              shadowRes,
              arcaneRes,
              material,
              block,
              socketColor1,
              socketContent1,
              socketColor2,
              socketContent2,
              socketColor3,
              socketContent3,
              socketBonus
            }
            if (itemset !== 0) {
              const detailedItemSet = this.itemSets.find((itemSet) => itemset === itemSet.ID)

              if (detailedItemSet) {
                const { FactionGainID, ID } = detailedItemSet
                returnObj.item.itemset = { name: FactionGainID, id: ID }
              } else {
                returnObj.item.itemset = itemset
              }
            } else {
              returnObj.item.itemset = itemset
            }
          } else {
            returnObj.item = null
          }
        }

        if (splittedItemStr[1]?.includes("ench")) {
          const enchantId = parseInt(splittedItemStr[1].replace("ench=", ""))
          returnObj.enchant =
            this.enchants.find((enchant) => enchant.enchantId === enchantId) ?? null
        }

        if (splittedItemStr[2]?.includes("gems")) {
          returnObj.gems = splittedItemStr[2]
            .replace("gems=", "")
            .split(":")
            .map(
              (gemId: string) =>
                this.gems.find((gem) => gem.gemEnchantId === parseInt(gemId)) ?? null
            )
            .filter((gem) => gem !== null)
        }

        return returnObj
      })

    const dungeonAndRaidsCategory = [
      "14808",
      "14805",
      "14806",
      "14921",
      "14922",
      "14923",
      "14961",
      "14962",
      "15001",
      "15002",
      "15041",
      "15042"
    ]

    const achievements: number[] = []

    for (let i = 0; i < dungeonAndRaidsCategory.length; i++) {
      const subAchievementPage = await fetch(
        `http://armory.warmane.com/character/${name}/Icecrown/achievements`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: new URLSearchParams({
            category: dungeonAndRaidsCategory[i]
          })
        }
      )
        .then((res) => res.json())
        .then(
          (resObj: { content: string }) =>
            new JSDOM(`<html><head></head><body>${resObj.content}</body></html>`).window.document
        )

      const subAchievements = [
        ...subAchievementPage.querySelectorAll<HTMLDivElement>(".achievement")
      ].map((achievementDiv: HTMLDivElement) => {
        const achievementId = parseInt(achievementDiv.id.replace("ach", ""))
        // return {
        //   id: achievementId,
        //   name: this.achievements[achievementId]
        // }
        return achievementId
      })

      achievements.push(...subAchievements)
    }

    const primaryTalentPage = await fetch(
      `http://armory.warmane.com/character/${name}/Icecrown/talents`
    )
      .then((res) => res.text())
      .then((htmlStr: string) => new JSDOM(htmlStr).window.document)

    let primaryTalentsSpecId: Specs | null = null
    let primaryTalents: number[] | null = [
      ...primaryTalentPage.querySelectorAll<HTMLAnchorElement>("#spec-0 a.talent")
    ]
      .filter(
        (anchorNode: HTMLAnchorElement) =>
          anchorNode.style.backgroundImage.includes("bwicons") === false
      )
      .map((anchorNode: HTMLAnchorElement) => {
        const spellId = parseInt(anchorNode.href.replace(/\D/g, ""))
        if (ClassSpecs[spellId]) {
          primaryTalentsSpecId = ClassSpecs[spellId]
        }
        return spellId
      })

    primaryTalents = primaryTalents.length === 0 ? null : primaryTalents

    let primaryGlyphs: Glyph[] | null = [
      ...primaryTalentPage.querySelectorAll<HTMLAnchorElement>(
        'div[data-glyphs="0"] .glyph.major a,div[data-glyphs="0"] .glyph.minor a'
      )
    ].map((anchorNode: HTMLAnchorElement) => {
      const glyphSpellId = parseInt(anchorNode.href.replace(/\D/g, ""))
      return this.glyphs.find((glyph) => glyph.spellId === glyphSpellId)
    })

    primaryGlyphs = primaryGlyphs.length === 0 ? null : primaryGlyphs

    let secondaryTalentsSpecId: Specs | null = null

    let secondaryTalents: number[] | null = [
      ...primaryTalentPage.querySelectorAll<HTMLAnchorElement>("#spec-1 a.talent")
    ]
      .filter(
        (anchorNode: HTMLAnchorElement) =>
          anchorNode.style.backgroundImage.includes("bwicons") === false
      )
      .map((anchorNode: HTMLAnchorElement) => {
        const spellId = parseInt(anchorNode.href.replace(/\D/g, ""))
        if (ClassSpecs[spellId]) {
          secondaryTalentsSpecId = ClassSpecs[spellId]
        }
        return spellId
      })

    secondaryTalents = secondaryTalents.length === 0 ? null : secondaryTalents

    let secondaryGlyphs: Glyph[] | null = [
      ...primaryTalentPage.querySelectorAll<HTMLAnchorElement>(
        'div[data-glyphs="1"] .glyph.major a,div[data-glyphs="1"] .glyph.minor a'
      )
    ].map((anchorNode: HTMLAnchorElement) => {
      const glyphSpellId = parseInt(anchorNode.href.replace(/\D/g, ""))
      return this.glyphs.find((glyph) => glyph.spellId === glyphSpellId)
    })

    secondaryGlyphs = secondaryGlyphs.length === 0 ? null : secondaryGlyphs

    return {
      classId,
      items,
      achievements,
      primaryTalents,
      primaryTalentsSpecId,
      primaryGlyphs,
      secondaryTalents,
      secondaryGlyphs,
      secondaryTalentsSpecId
    }
  }
}
