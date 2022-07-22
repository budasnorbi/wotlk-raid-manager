import { Module } from '@nestjs/common';
import { CharacterInfoController } from './characterinfo.controller';
import { CharacterInfoService } from './characterinfo.service';

@Module({
  providers: [CharacterInfoService, CharacterInfoController],
})
export class CharacterInfoModule {}
