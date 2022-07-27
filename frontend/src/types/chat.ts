export interface SMSG_MESSAGECHAT_RETURN {
  type: ChatType
  language: Language
  senderGUID: Buffer
  receiverGUID: Buffer
  messageLength: number
  message: string
  chatTag: number
}

export enum ChatType {
  CHAT_MSG_ADDON = 0xff,
  CHAT_MSG_SYSTEM = 0x00,
  CHAT_MSG_SAY = 0x01,
  CHAT_MSG_PARTY = 0x02,
  CHAT_MSG_RAID = 0x03,
  CHAT_MSG_GUILD = 0x04,
  CHAT_MSG_OFFICER = 0x05,
  CHAT_MSG_YELL = 0x06,
  CHAT_MSG_WHISPER = 0x07,
  CHAT_MSG_WHISPER_FOREIGN = 0x08,
  CHAT_MSG_WHISPER_INFORM = 0x09,
  CHAT_MSG_EMOTE = 0x0a,
  CHAT_MSG_TEXT_EMOTE = 0x0b,
  CHAT_MSG_MONSTER_SAY = 0x0c,
  CHAT_MSG_MONSTER_PARTY = 0x0d,
  CHAT_MSG_MONSTER_YELL = 0x0e,
  CHAT_MSG_MONSTER_WHISPER = 0x0f,
  CHAT_MSG_MONSTER_EMOTE = 0x10,
  CHAT_MSG_CHANNEL = 0x11,
  CHAT_MSG_CHANNEL_JOIN = 0x12,
  CHAT_MSG_CHANNEL_LEAVE = 0x13,
  CHAT_MSG_CHANNEL_LIST = 0x14,
  CHAT_MSG_CHANNEL_NOTICE = 0x15,
  CHAT_MSG_CHANNEL_NOTICE_USER = 0x16,
  CHAT_MSG_AFK = 0x17,
  CHAT_MSG_DND = 0x18,
  CHAT_MSG_IGNORED = 0x19,
  CHAT_MSG_SKILL = 0x1a,
  CHAT_MSG_LOOT = 0x1b,
  CHAT_MSG_MONEY = 0x1c,
  CHAT_MSG_OPENING = 0x1d,
  CHAT_MSG_TRADESKILLS = 0x1e,
  CHAT_MSG_PET_INFO = 0x1f,
  CHAT_MSG_COMBAT_MISC_INFO = 0x20,
  CHAT_MSG_COMBAT_XP_GAIN = 0x21,
  CHAT_MSG_COMBAT_HONOR_GAIN = 0x22,
  CHAT_MSG_COMBAT_FACTION_CHANGE = 0x23,
  CHAT_MSG_BG_SYSTEM_NEUTRAL = 0x24,
  CHAT_MSG_BG_SYSTEM_ALLIANCE = 0x25,
  CHAT_MSG_BG_SYSTEM_HORDE = 0x26,
  CHAT_MSG_RAID_LEADER = 0x27,
  CHAT_MSG_RAID_WARNING = 0x28,
  CHAT_MSG_RAID_BOSS_EMOTE = 0x29,
  CHAT_MSG_RAID_BOSS_WHISPER = 0x2a,
  CHAT_MSG_FILTERED = 0x2b,
  CHAT_MSG_BATTLEGROUND = 0x2c,
  CHAT_MSG_BATTLEGROUND_LEADER = 0x2d,
  CHAT_MSG_RESTRICTED = 0x2e,
  CHAT_MSG_BATTLENET = 0x2f,
  CHAT_MSG_ACHIEVEMENT = 0x30,
  CHAT_MSG_GUILD_ACHIEVEMENT = 0x31,
  CHAT_MSG_ARENA_POINTS = 0x32,
  CHAT_MSG_PARTY_LEADER = 0x33
}

export enum Language {
  LANG_UNIVERSAL = 0,
  LANG_ORCISH = 1,
  LANG_DARNASSIAN = 2,
  LANG_TAURAHE = 3,
  LANG_DWARVISH = 6,
  LANG_COMMON = 7,
  LANG_DEMONIC = 8,
  LANG_TITAN = 9,
  LANG_THALASSIAN = 10,
  LANG_DRACONIC = 11,
  LANG_KALIMAG = 12,
  LANG_GNOMISH = 13,
  LANG_TROLL = 14,
  LANG_GUTTERSPEAK = 33,
  LANG_DRAENEI = 35,
  LANG_ZOMBIE = 36,
  LANG_GNOMISH_BINARY = 37,
  LANG_GOBLIN_BINARY = 38,
  LANG_ADDON = 0xffffffff
}
