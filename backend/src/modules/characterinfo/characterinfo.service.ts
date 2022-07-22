import { Injectable } from '@nestjs/common';
import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import { Item } from '../../types/item';
import { SpellItemEnchantments } from './dbc';

@Injectable()
export class CharacterInfoService {
  page: Page;
  browser: Browser;
  constructor() {
    puppeteer.use(StealthPlugin());
    puppeteer.use(
      AdblockerPlugin({
        blockTrackers: true,
      }),
    );
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '-disable-infobars',
        '--ignore-certificate-errors',
        '--ignore-certificate-errors-spki-list',
        '--window-size=784,600',
        '--disable-web-security',
      ],
    });

    this.page = (await this.browser.pages())[0];
  }

  public async getCharacterInfo(name: string) {
    try {
      await this.page.goto(
        `http://armory.warmane.com/character/${name}/Icecrown/profile`,
        { waitUntil: 'networkidle0', timeout: 0 },
      );
    } catch (error) {
      console.log(error);
    }

    const items: Item[] = await this.page.$$eval(
      '.item-model .item-slot a',
      (anchorEl: any[], enchantDBC) => {
        return anchorEl
          .map((a, index: number) => {
            if (!a.rel) {
              return null;
            }

            const returnObj: Item = { slot: 0, item: 0 };
            switch (index) {
              case 0: {
                returnObj.slot = 0;
                break;
              }
              case 1: {
                returnObj.slot = 1;
                break;
              }
              case 2: {
                returnObj.slot = 2;
                break;
              }
              case 3: {
                returnObj.slot = 14;
                break;
              }
              case 4: {
                returnObj.slot = 4;
                break;
              }
              case 5: {
                returnObj.slot = 3;
                break;
              }
              case 6: {
                returnObj.slot = 18;
                break;
              }
              case 7: {
                returnObj.slot = 8;
                break;
              }
              case 8: {
                returnObj.slot = 9;
                break;
              }
              case 9: {
                returnObj.slot = 5;
                break;
              }
              case 10: {
                returnObj.slot = 6;
                break;
              }
              case 11: {
                returnObj.slot = 7;
                break;
              }
              case 12: {
                returnObj.slot = 10;
                break;
              }
              case 13: {
                returnObj.slot = 11;
                break;
              }
              case 14: {
                returnObj.slot = 12;
                break;
              }
              case 15: {
                returnObj.slot = 13;
                break;
              }
              case 16: {
                returnObj.slot = 15;
                break;
              }
              case 17: {
                returnObj.slot = 16;
                break;
              }
              case 18: {
                returnObj.slot = 17;
                break;
              }
            }

            const splittedItemStr = a.rel.split('&');
            for (let i = 0; i < splittedItemStr.length; i++) {
              if (splittedItemStr[i].includes('item')) {
                returnObj.item = parseInt(
                  splittedItemStr[i].replace('item=', ''),
                );
                continue;
              }

              if (splittedItemStr[i].includes('ench')) {
                returnObj.enchant = parseInt(
                  splittedItemStr[i].replace('ench=', ''),
                );
                continue;
              }

              if (splittedItemStr[i].includes('gems')) {
                returnObj.gems = splittedItemStr[i]
                  .replace('gems=', '')
                  .split(':')
                  .map((x: string) => enchantDBC[x])
                  .filter((x: number | null) => !!x);
                continue;
              }
            }
            return returnObj;
          })
          .filter((item) => item !== null);
      },
      SpellItemEnchantments,
    );

    try {
      await this.page.goto(
        `http://armory.warmane.com/character/${name}/Icecrown/achievements`,
        { waitUntil: 'networkidle0', timeout: 0 },
      );
    } catch (error) {
      console.log(error);
    }

    const dungeonAndRaidsCategory = [
      '14808',
      '14805',
      '14806',
      '14921',
      '14922',
      '14923',
      '14961',
      '14962',
      '15001',
      '15002',
      '15041',
      '15042',
    ];

    const achievements: string[] = [];

    await this.page.click(`a[data-category="${168}"]`);
    for (let i = 0; i < dungeonAndRaidsCategory.length; i++) {
      const categoryId = dungeonAndRaidsCategory[i];
      await this.page.click(`a[data-subcategory="${categoryId}"]`);

      const achievements: string[] = await this.page.$$eval(
        '.achievement',
        (divs: HTMLDivElement[]) => {
          return divs.map((div) => div.id.replace('ach', ''));
        },
      );

      achievements.push(...achievements);
    }

    try {
      await this.page.goto(
        `http://armory.warmane.com/character/${name}/Icecrown/talents`,
        { waitUntil: 'networkidle0', timeout: 0 },
      );
    } catch (error) {
      console.log(error);
    }

    const talents: {
      primary: number[];
      secondary?: number[];
    } = { primary: [] };
    const glyphs: {
      primary: { minor: number[]; major: number[] };
      secondary?: { minor: number[]; major: number[] };
    } = {
      primary: {
        minor: [],
        major: [],
      },
    };

    const { activeTalentGroupId, talentCount }: any = await this.page
      .$$eval('#character-sheet .talent-spec-switch td a', (divEl: any) => {
        let activeTalentGroupId = 0;

        if (divEl[0].parentElement.className === 'selected') {
          activeTalentGroupId = 0;
        }

        if (divEl[1].parentElement.className === 'selected') {
          activeTalentGroupId = 1;
        }

        return {
          activeTalentGroupId,
          talentCount: divEl.length,
        };
      })
      .catch(() => {
        return {
          activeTalentGroupId: 0,
          talentCount: 1,
        };
      });

    if (talentCount === 1) {
      const primaryTalents: number[] = await this.page.$$eval(
        `#spec-${0} a.talent`,
        (anchors: any) => {
          return anchors
            .filter(
              (x: any) => x.style.backgroundImage.includes('bwicons') === false,
            )
            .map((x: any) => parseInt(x.href.replace(/\D/g, '')));
        },
      );

      talents.primary = primaryTalents;

      const primaryTalentMajorGlyph = await this.page.$$eval(
        `div[data-glyphs="${0}"] .glyph.major a`,
        (anchors: any) => {
          return anchors.map((anchor: any) =>
            parseInt(anchor.href.replace(/\D/g, '')),
          );
        },
      );

      glyphs.primary.major = primaryTalentMajorGlyph;

      const primaryTalentMinorGlyph: number[] = await this.page.$$eval(
        `div[data-glyphs="${0}"] .glyph.minor a`,
        (anchors: any) => {
          return anchors.map((anchor: any) =>
            parseInt(anchor.href.replace(/\D/g, '')),
          );
        },
      );

      glyphs.primary.minor = primaryTalentMinorGlyph;
    } else if (talentCount === 2) {
      const primaryTalents: number[] = await this.page.$$eval(
        `#spec-${0} a.talent`,
        (anchors: any) => {
          return anchors
            .filter(
              (x: any) => x.style.backgroundImage.includes('bwicons') === false,
            )
            .map((x: any) => parseInt(x.href.replace(/\D/g, '')));
        },
      );

      talents.primary = primaryTalents;

      const primaryTalentMajorGlyph: number[] = await this.page.$$eval(
        `div[data-glyphs="${0}"] .glyph.major a`,
        (anchors: any) => {
          return anchors.map((anchor: any) =>
            parseInt(anchor.href.replace(/\D/g, '')),
          );
        },
      );

      glyphs.primary.major = primaryTalentMajorGlyph;

      const primaryTalentMinorGlyph: number[] = await this.page.$$eval(
        `div[data-glyphs="${0}"] .glyph.minor a`,
        (anchors: any) => {
          return anchors.map((anchor: any) =>
            parseInt(anchor.href.replace(/\D/g, '')),
          );
        },
      );

      glyphs.primary.minor = primaryTalentMinorGlyph;

      const secondaryTalents: number[] = await this.page.$$eval(
        `#spec-${1} a.talent`,
        (anchors: any) => {
          return anchors
            .filter(
              (x: any) => x.style.backgroundImage.includes('bwicons') === false,
            )
            .map((x: any) => parseInt(x.href.replace(/\D/g, '')));
        },
      );

      talents.secondary = secondaryTalents;

      const secondaryTalentMajorGlyph: number[] = await this.page.$$eval(
        `div[data-glyphs="${1}"] .glyph.major a`,
        (anchors: any) => {
          return anchors.map((anchor: any) =>
            parseInt(anchor.href.replace(/\D/g, '')),
          );
        },
      );

      glyphs.secondary.major = secondaryTalentMajorGlyph;

      const secondaryTalentMinorGlyph: number[] = await this.page.$$eval(
        `div[data-glyphs="${1}"] .glyph.minor a`,
        (anchors: any) => {
          return anchors.map((anchor: any) =>
            parseInt(anchor.href.replace(/\D/g, '')),
          );
        },
      );

      glyphs.secondary.minor = secondaryTalentMinorGlyph;
    }

    return {
      items,
      achievements,
      talents,
      glyphs,
    };
  }
}
