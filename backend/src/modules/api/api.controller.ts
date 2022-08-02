import { CharacterInfoService } from "@modules/characterinfo/characterinfo.service"
import { Controller, Get, Query } from "@nestjs/common"
import { ItemCompareService } from "./item-compare.service"
import { TalentCompareService } from "./talent-compare.service"

@Controller("")
export class ApiController {
  constructor(
    private talentCompareService: TalentCompareService,
    private itemCompareService: ItemCompareService,
    private characterInfoService: CharacterInfoService
  ) {}

  @Get("test")
  test(@Query("name") name: string) {
    return this.characterInfoService.getCharacterInfo(name)
  }
}
