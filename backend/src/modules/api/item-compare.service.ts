import { Injectable } from "@nestjs/common"

@Injectable()
export class ItemCompareService {
  public async getCharacterItemDetails(characterItems: any) {
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
