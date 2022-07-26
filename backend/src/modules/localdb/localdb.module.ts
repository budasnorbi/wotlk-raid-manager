import { Module } from "@nestjs/common"
import { LocalDbService } from "./localdb.service"

@Module({
  providers: [LocalDbService],
  exports: [LocalDbService]
})
export class LocalDbModule {}
