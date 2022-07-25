import { Module } from "@nestjs/common"
import { CharacterInfoService } from "./characterinfo.service"

@Module({
  providers: [CharacterInfoService],
  exports: [CharacterInfoService]
})
export class CharacterInfoModule {}
