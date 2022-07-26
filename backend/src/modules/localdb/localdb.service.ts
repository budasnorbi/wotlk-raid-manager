import { Injectable } from "@nestjs/common"
import { DBItem } from "@type/item"
import * as asyncFs from "fs/promises"
import { dirname } from "path"
import { Gem } from "@type/gems"
import { Enchant } from "@type/enchants"
import { Achievements } from "@type/achievements"
import { Glyph } from "@type/glyphs"
import { ItemSet } from "@type/item-sets"
const appDir = dirname(require.main.filename)

@Injectable()
export class LocalDbService {
  private gems: Gem[]
  private enchants: Enchant[]
  private items: DBItem[]
  private achievements: Achievements
  private glyphs: Glyph[]
  private itemSets: ItemSet[]

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
      (await asyncFs.readFile(`${appDir}/../data/weapon_armors.json`)).toString()
    )
  }

  public itemSet(id: number, filterType: keyof ItemSet = "ID"): ItemSet | null {
    return this.itemSets.find((itemSet) => itemSet[filterType] === id) ?? null
  }

  public glyph(id: number, filterType: keyof Glyph = "spellId"): Glyph | null {
    return this.glyphs.find((glyph) => glyph[filterType] === id) ?? null
  }

  public achievement(id: number): string | null {
    return this.achievements[id] ?? null
  }

  public gem(id: number, filterType: keyof Gem = "gemEnchantId"): Gem | null {
    return this.gems.find((gem) => gem[filterType] === id) ?? null
  }

  public enchant(id: number, filterType: keyof Enchant = "enchantId"): Enchant | null {
    return this.enchants.find((enchant) => enchant[filterType] === id) ?? null
  }

  public item(id: number, filterType: keyof DBItem = "entry"): DBItem | null {
    return this.items.find((item) => item[filterType] === id) ?? null
  }
}
