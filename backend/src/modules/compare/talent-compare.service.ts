import { Injectable } from '@nestjs/common';
import * as asyncFs from 'fs/promises';
import { dirname } from 'path';
const appDir = dirname(require.main.filename);

@Injectable()
export class TalentCompareService {
  talents: any;
  constructor() {
    this.loadTalentsDB();
  }

  async loadTalentsDB() {
    this.talents = (
      await asyncFs.readFile(`${appDir}/../data/talents.json`)
    ).toJSON().data;

    console.log(this.talents);
  }
}
