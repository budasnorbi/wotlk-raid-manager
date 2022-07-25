import { Module } from "@nestjs/common";
import { ParserGateway } from "./parser.gateway";
import { ParserService } from "./parser.service";

@Module({
  providers: [ParserGateway, ParserService],
})
export class ParserModule {}
