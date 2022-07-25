import { Injectable } from "@nestjs/common"
import { Enchant } from "@type/enchants"
import { DBItem, DetailedItem, Item } from "@type/item"
import * as asyncFs from "fs/promises"
import { dirname } from "path"
const appDir = dirname(require.main.filename)

@Injectable()
export class ItemCompareService {
  items: DBItem[]
  enchants: Enchant[]
  constructor() {
    this.loadItemsDB()
    this.loadEnchantsDB()
  }

  async loadItemsDB() {
    this.items = JSON.parse(
      (
        await asyncFs.readFile(`${appDir}/../data/weapons_armors_glyphs_gems_enchants.json`)
      ).toString()
    )
  }

  async loadEnchantsDB() {
    this.enchants = JSON.parse(
      (await asyncFs.readFile(`${appDir}/../data/enchants.json`)).toString()
    )
  }

  private findDBItemById(entry: number) {
    return this.items.find((item) => item.entry === entry)
  }

  public async getCharacterItemDetails(characterItems: Item[]) {
    return characterItems.map((characterItem) => {
      // const detailedItem: any = this.items.find((item) => item.entry === characterItem.item)
      // if (characterItem.enchant) {
      //   detailedItem.enchant = this.enchants.find(
      //     (enchant) => enchant.enchantId === detailedItem.enchant
      //   )
      // }
      // if (characterItem.gems && characterItem.gems.length !== 0) {
      //   detailedItem.gems = characterItem.gems.map((gemId) =>
      //     this.items.find((item) => item.entry === gemId)
      //   )
      // }
      // return detailedItem
    })
  }
}
