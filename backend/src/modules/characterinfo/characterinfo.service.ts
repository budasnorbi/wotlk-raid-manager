import { Injectable } from "@nestjs/common"
import { DBItem, Item } from "@type/item"
import { JSDOM } from "jsdom"
import fetch from "node-fetch"
import { Glyph } from "@type/glyphs"
import { ClassSpecs, Specs } from "@type/class-specs"
import { LocalDbService } from "@modules/localdb/localdb.service"
import { getClassId } from "@helpers/classid"
import { destructItem } from "@helpers/destruct-item"
import { getItemInventoryTypeBySniffIndex } from "@helpers/item-inventory-type"

@Injectable()
export class CharacterInfoService {
  constructor(private localDbService: LocalDbService) {}

  public async getCharacterItemByInventoryType(
    name: string,
    inventoryType: DBItem["InventoryType"]
  ) {
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

    const classId = getClassId(classText)

    const items = [...profilePage.querySelectorAll<HTMLAnchorElement>(".item-model .item-slot a")]
      // Filter tabard and shirt
      .filter((_, index) => index !== 5 && index !== 6)

    for (let index = 0; index < items.length; index++) {
      const itemInventoryType = getItemInventoryTypeBySniffIndex(classId, index)

      if (itemInventoryType !== inventoryType) {
        continue
      }

      const anchorNode: HTMLAnchorElement = items[index]
      const splittedItemStr = anchorNode.rel.split("&")

      if (splittedItemStr[0]?.includes("item")) {
        const itemId = parseInt(splittedItemStr[0].replace("item=", ""))
        const item = this.localDbService.item(itemId)

        return item ? destructItem(item) : null
      }
    }

    return null
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

    const classId = getClassId(classText)

    const items = [...profilePage.querySelectorAll<HTMLAnchorElement>(".item-model .item-slot a")]
      // Filter tabard and shirt
      .filter((_, index) => index !== 5 && index !== 6)
      .map((anchorNode: HTMLAnchorElement) => {
        const returnObj: Item = { item: null, gems: null, enchant: null }

        const splittedItemStr = anchorNode.rel.split("&")

        if (splittedItemStr[0]?.includes("item")) {
          const itemId = parseInt(splittedItemStr[0].replace("item=", ""))
          const item = this.localDbService.item(itemId)

          if (item) {
            returnObj.item = destructItem(item)
          } else {
            returnObj.item = null
          }
        }

        if (splittedItemStr[1]?.includes("ench")) {
          const enchantId = parseInt(splittedItemStr[1].replace("ench=", ""))
          returnObj.enchant = this.localDbService.enchant(enchantId)
        }

        if (splittedItemStr[2]?.includes("gems")) {
          returnObj.gems = splittedItemStr[2]
            .replace("gems=", "")
            .split(":")
            .map((gemId: string) => this.localDbService.gem(parseInt(gemId)))
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
      return this.localDbService.glyph(glyphSpellId)
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
      return this.localDbService.glyph(glyphSpellId)
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
