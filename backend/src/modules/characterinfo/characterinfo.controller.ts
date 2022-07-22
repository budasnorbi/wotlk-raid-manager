import { Controller, Get, Query } from '@nestjs/common';
import { CharacterInfoService } from './characterinfo.service';

@Controller('characterinfo')
export class CharacterInfoController {
  constructor(private characterInfoService: CharacterInfoService) {}
  @Get('/')
  findAll(@Query('name') name: string): any {
    const characterInfo = this.characterInfoService.getCharacterInfo(name);
  }
}
