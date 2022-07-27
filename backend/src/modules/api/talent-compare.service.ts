import { FilteredTalents } from "@entities/FilteredTalents.entity"
import { CharacterInfoService } from "@modules/characterinfo/characterinfo.service"
import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"

// import { FilteredTalentsRepository } from "@repositories/FilteredTalents.repository"
import { Classes } from "@type/classes"
import { SniffedTalents } from "@type/sniffed-talent"
import * as asyncFs from "fs/promises"
import { dirname } from "path"
import { Repository } from "typeorm"
const appDir = dirname(require.main.filename)

@Injectable()
export class TalentCompareService {
  @InjectRepository(FilteredTalents)
  private filteredTalentsRepository: Repository<FilteredTalents>

  // async getSpellByName(name: string) {
  //   return this.talents.filter((talent) => talent.name.includes(name))
  // }

  // async compareMemberTalentsWithDisabledTalents(classId: Classes, memberTalents: SniffedTalents) {
  //   const disabledTalents = await this.filteredTalentsRepository
  //     .find({ where: { classId } })
  //     .then((result) => result.map((talent) => talent.spellId))
  //     .catch((error) => {
  //       console.log(error)
  //       throw new InternalServerErrorException()
  //     })

  //   return memberTalents.primary
  //     .filter((talent) => disabledTalents.includes(talent))
  //     .map((disabledTalent) => {
  //       return this.talents.find((talent) => talent.id === disabledTalent)
  //     })
  // }
}
