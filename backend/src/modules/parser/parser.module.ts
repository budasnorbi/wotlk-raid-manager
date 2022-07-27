import { CharacterInfoService } from "@modules/characterinfo/characterinfo.service"
import { LocalDbService } from "@modules/localdb/localdb.service"
import { Module } from "@nestjs/common"
import { ParserGateway } from "./parser.gateway"
import { ParserService } from "./parser.service"

@Module({
  providers: [ParserGateway, ParserService, LocalDbService, CharacterInfoService]
})
export class ParserModule {}
