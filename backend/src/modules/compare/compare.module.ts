import { Module } from '@nestjs/common';

import { TalentCompareService } from './talent-compare.service';

@Module({
  providers: [TalentCompareService],
  exports: [TalentCompareService],
})
export class CompareModule {}
