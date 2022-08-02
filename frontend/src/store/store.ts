import { Raid } from "@type/parsers-types"
import { RAID_LEADER_UPDATED } from "@type/socket-responses"
import produce from "immer"

import create from "zustand"
import { devtools } from "zustand/middleware"

export interface Store {
  raid: Raid | null
  setRaid: (data: Raid | null) => void
  setRaidLeader: (data: RAID_LEADER_UPDATED) => void
}

export const useStore = create<Store>()(
  devtools((set) => {
    return {
      raid: null,
      setRaid(data) {
        set(
          produce((state: Store) => {
            state.raid = data
          }),
          false,
          "setRaid"
        )
      },
      setRaidLeader(data) {
        set(
          produce((state: Store) => {
            if (!state.raid) {
              return
            }

            const newLeaderIndex = state.raid.members.findIndex(
              (member) => member.name === data.name
            )

            if (newLeaderIndex === -1) {
              return
            }

            const newLeader = state.raid.members[newLeaderIndex]

            state.raid.members[newLeaderIndex] = {
              characterInfo: state.raid.leaderCharacterInfo,
              GUID: state.raid.leaderGUID,
              name: state.raid.leaderName
            }

            state.raid.leaderCharacterInfo = newLeader.characterInfo
            state.raid.leaderGUID = newLeader.GUID
            state.raid.leaderName = newLeader.name
          }),
          false,
          "setRaidLeader"
        )
      }
    }
  })
)
