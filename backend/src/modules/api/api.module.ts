import { FilteredTalents } from "@entities/FilteredTalents.entity"
import { CharacterInfoModule } from "@modules/characterinfo/characterinfo.module"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ApiController } from "./api.controller"
import { ItemCompareService } from "./item-compare.service"

import { TalentCompareService } from "./talent-compare.service"

@Module({
  controllers: [ApiController],
  providers: [TalentCompareService, ItemCompareService],
  imports: [CharacterInfoModule, TypeOrmModule.forFeature([FilteredTalents])]
})
export class ApiModule {}
