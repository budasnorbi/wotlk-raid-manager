import { LocalDbService } from "@modules/localdb/localdb.service"
import { Module } from "@nestjs/common"
import { CharacterInfoService } from "./characterinfo.service"

@Module({
  providers: [CharacterInfoService, LocalDbService],
  exports: [CharacterInfoService]
})
export class CharacterInfoModule {}
