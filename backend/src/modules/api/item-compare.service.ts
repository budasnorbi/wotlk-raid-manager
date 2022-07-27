import { Injectable } from "@nestjs/common"
import { Enchant } from "@type/enchants"
import { DBItem, DetailedItem, Item } from "@type/item"


@Injectable()
export class ItemCompareService {
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
