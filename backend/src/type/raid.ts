export enum GroupType {
  GROUPTYPE_NORMAL = 0,
  GROUPTYPE_BG = 1,
  GROUPTYPE_RAID = 2,
  GROUPTYPE_LFG_RESTRICTED = 4,
  GROUPTYPE_LFG = 8
}

export enum PlayerStatus {
  MEMBER_STATUS_OFFLINE = 0,
  MEMBER_STATUS_ONLINE = 1,
  MEMBER_STATUS_PVP = 2,
  MEMBER_STATUS_DEAD = 4,
  MEMBER_STATUS_GHOST = 8,
  MEMBER_STATUS_PVP_FFA = 16,
  MEMBER_STATUS_UNK3 = 32,
  MEMBER_STATUS_AFK = 64,
  MEMBER_STATUS_DND = 128
}

export enum RaidRoles {
  MEMBER_FLAG_ASSISTANT = 1,
  MEMBER_FLAG_MAINTANK = 2,
  MEMBER_FLAG_MAINASSIST = 4
}

export enum LootMethod {
  FREE_FOR_ALL = 0,
  ROUND_ROBIN = 1,
  MASTER_LOOT = 2,
  GROUP_LOOT = 3,
  NEED_BEFORE_GREED = 4
}

export enum LootTreshold {
  ITEM_QUALITY_UNCOMMON = 2,
  ITEM_QUALITY_RARE = 3,
  ITEM_QUALITY_EPIC = 4
}

export enum DungeonDifficulty {
  DUNGEON_DIFFICULTY_NORMAL = 0,
  DUNGEON_DIFFICULTY_HEROIC = 1,
  DUNGEON_DIFFICULTY_EPIC = 2
}

export enum RaidDifficulty {
  RAID_DIFFICULTY_10MAN_NORMAL = 0,
  RAID_DIFFICULTY_25MAN_NORMAL = 1,
  RAID_DIFFICULTY_10MAN_HEROIC = 2,
  RAID_DIFFICULTY_25MAN_HEROIC = 3
}

export interface Member {
  name: string
  GUID: bigint
  status: PlayerStatus
  subGroup: number
  updateFlags: number
  role: RaidRoles
}

export interface Raid {
  groupType: GroupType
  subGroup: number
  flags: number
  playerRolesAssigned: number
  // groupGUID: Buffer;
  counter: number
  memberCount: number
  members: Member[]
  leaderGUID: bigint
  lootMethod: LootMethod
  // looterGUID: number;
  lootTreshold: LootTreshold
  dungeonDifficulty: DungeonDifficulty
  raidDifficulty: RaidDifficulty
}
