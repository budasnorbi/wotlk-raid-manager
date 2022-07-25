import { CharacterInfoService } from "@modules/characterinfo/characterinfo.service"
import { Controller, Get, Query } from "@nestjs/common"
import { ItemCompareService } from "./item-compare.service"
import { TalentCompareService } from "./talent-compare.service"

@Controller("compare")
export class CompareController {
  constructor(
    private talentCompareService: TalentCompareService,
    private itemCompareService: ItemCompareService,
    private characterInfoService: CharacterInfoService
  ) {}
  @Get("/")
  async findAll(@Query("name") name: string) {
    return this.characterInfoService.getCharacterInfo(name)

    // const playersDisabledTalents =
    //   await this.talentCompareService.compareMemberTalentsWithDisabledTalents(
    //     characterInfo.classId,
    //     characterInfo.talents
    //   )

    // const detailedItems = this.itemCompareService.getCharacterItemDetails(characterInfo.items)

    // return {
    //   characterInfo,
    //   playersDisabledTalents,
    //   detailedItems
    // }
  }
}
