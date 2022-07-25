import { FilteredTalents } from "@entities/FilteredTalents.entity"
import { CharacterInfoModule } from "@modules/characterinfo/characterinfo.module"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CompareController } from "./compare.controller"
import { ItemCompareService } from "./item-compare.service"

import { TalentCompareService } from "./talent-compare.service"

@Module({
  controllers: [CompareController],
  providers: [TalentCompareService, ItemCompareService],
  imports: [CharacterInfoModule, TypeOrmModule.forFeature([FilteredTalents])]
})
export class CompareModule {}
