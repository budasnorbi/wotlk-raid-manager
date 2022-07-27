export interface Member {
  name: string
  GUID: Buffer
  // status: PlayerStatus
  // subGroup: number
  // updateFlags: number
  // role: RaidRoles
}

export enum RaidDifficulty {
  RAID_DIFFICULTY_10MAN_NORMAL = 0,
  RAID_DIFFICULTY_25MAN_NORMAL = 1,
  RAID_DIFFICULTY_10MAN_HEROIC = 2,
  RAID_DIFFICULTY_25MAN_HEROIC = 3
}

export enum LootMethod {
  FREE_FOR_ALL = 0,
  ROUND_ROBIN = 1,
  MASTER_LOOT = 2,
  GROUP_LOOT = 3,
  NEED_BEFORE_GREED = 4
}

export interface PARTY_GROUP_CONVERTED_TO_RAID {
  members: Member[]
  leaderGUID: Buffer | null
  leaderName: string | null
  raidDifficulty: RaidDifficulty
  lootMethod: LootMethod
}
