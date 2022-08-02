import type { NextPage } from "next"
import { useCallback, useEffect, useState } from "react"
import { socket } from "../utils/socket"
import {
  PARTY_GROUP_CONVERTED_TO_RAID,
  PLAYER_JOINED_TO_THE_RAID,
  PLAYER_LEAVED_THE_RAID,
  RAID_DIFFICULTY_UPDATED,
  RAID_LEADER_UPDATED,
  RAID_LOOTMETHOD_UPDATED,
  RAID_LOOT_TRESHOLD_UPDATED,
  RAID_NO_CHARACTER_ITEM_SLOT_INDEX_ERROR,
  RAID_NO_ITEMID_IN_CHAT_ERROR,
  RAID_NO_LEADER_ERROR,
  RAID_NO_ROLL_MEMBER_INFO_ERROR,
  RAID_PLAYER_ROLLED,
  RAID_ROLL_ENDED,
  RAID_ROLL_STARTED
} from "src/type/socket-responses"
import { Raid } from "src/type/parsers-types"
import { useStore } from "src/store/store"
import { Box, Grid, ListItemText, Paper, Typography } from "@mui/material"
import { List, ListItem } from "@mui/material"
import Divider from "@mui/material/Divider"
import { Member } from "@components/Member"

const Index: NextPage = () => {
  const setRaid = useStore(useCallback((state) => state.setRaid, []))
  const setRaidLeader = useStore(useCallback((state) => state.setRaidLeader, []))
  const raidInitialized = useStore((state) => state.raid !== null)
  const raid = useStore((state) => state.raid)

  useEffect(() => {
    socket.on("RAID_DETAILS", (data: Raid | null) => {
      setRaid(data)
    })

    socket.on("PARTY_GROUP_CONVERTED_TO_RAID", (data: PARTY_GROUP_CONVERTED_TO_RAID) => {
      setRaid(data)
    })

    socket.on("RAID_GROUP_CONVERTED_TO_GROUP", (data: null) => {
      setRaid(data)
    })

    socket.on("RAID_NO_LEADER_ERROR", (data: RAID_NO_LEADER_ERROR) => console.log(data))

    socket.on("RAID_NO_ITEMID_IN_CHAT_ERROR", (data: RAID_NO_ITEMID_IN_CHAT_ERROR) =>
      console.log(data)
    )

    socket.on(
      "RAID_NO_CHARACTER_ITEM_SLOT_INDEX_ERROR",
      (data: RAID_NO_CHARACTER_ITEM_SLOT_INDEX_ERROR) => console.log(data)
    )

    socket.on("RAID_NO_ROLL_MEMBER_INFO_ERROR", (data: RAID_NO_ROLL_MEMBER_INFO_ERROR) =>
      console.log(data)
    )

    return () => {
      socket.removeAllListeners("PARTY_GROUP_CONVERTED_TO_RAID")
      socket.removeAllListeners("RAID_DETAILS")
      socket.removeAllListeners("RAID_GROUP_CONVERTED_TO_GROUP")
      socket.removeAllListeners("RAID_NO_LEADER_ERROR")
      socket.removeAllListeners("RAID_NO_ITEMID_IN_CHAT_ERROR")
      socket.removeAllListeners("RAID_NO_CHARACTER_ITEM_SLOT_INDEX_ERROR")
      socket.removeAllListeners("RAID_NO_ROLL_MEMBER_INFO_ERROR")
    }
  }, [])

  useEffect(() => {
    if (raidInitialized) {
      socket.on("RAID_GROUP_CONVERTED_TO_GROUP", (data: null) => {
        setRaid(data)
      })

      socket.on("PLAYER_JOINED_TO_THE_RAID", (data: PLAYER_JOINED_TO_THE_RAID) => {
        console.log("PLAYER_JOINED_TO_THE_RAID: ", data)
      })

      socket.on("PLAYER_LEAVED_THE_RAID", (data: PLAYER_LEAVED_THE_RAID) => {
        console.log("PLAYER_LEAVED_THE_RAID: ", data)
      })

      socket.on("RAID_LEADER_UPDATED", (data: RAID_LEADER_UPDATED) => {
        setRaidLeader(data)
        console.log("RAID_LEADER_UPDATED: ", data)
      })

      socket.on("RAID_DIFFICULTY_UPDATED", (data: RAID_DIFFICULTY_UPDATED) => {
        console.log("RAID_DIFFICULTY_UPDATED: ", data)
      })

      socket.on("RAID_LOOTMETHOD_UPDATED", (data: RAID_LOOTMETHOD_UPDATED) => {
        console.log("RAID_LOOTMETHOD_UPDATED: ", data)
      })

      socket.on("RAID_LOOT_TRESHOLD_UPDATED", (data: RAID_LOOT_TRESHOLD_UPDATED) => {
        console.log("RAID_LOOT_TRESHOLD_UPDATED: ", data)
      })

      socket.on("RAID_ROLL_STARTED", (data: RAID_ROLL_STARTED) => {
        console.log("RAID_ROLL_STARTED: ", data)
      })

      socket.on("RAID_PLAYER_ROLLED", (data: RAID_PLAYER_ROLLED) => {
        console.log("RAID_PLAYER_ROLLED: ", data)
      })

      socket.on("RAID_ROLL_ENDED", (data: RAID_ROLL_ENDED) => {
        console.log("RAID_ROLL_ENDED: ", data)
      })
    }
  }, [raidInitialized])

  return (
    <Box component="div" sx={{ display: "flex" }}>
      {raid && (
        <>
          <Member
            name={raid.leaderName}
            activedTalentIndex={raid.leaderCharacterInfo.activeTalentIndex}
            primaryTalentsSpecId={raid.leaderCharacterInfo.primaryTalentsSpecId}
            secondaryTalentsSpecId={raid.leaderCharacterInfo.secondaryTalentsSpecId}
          />
          {raid.members.map((member) => (
            <Member
              key={member.name}
              name={member.name}
              activedTalentIndex={member.characterInfo.activeTalentIndex}
              primaryTalentsSpecId={member.characterInfo.primaryTalentsSpecId}
              secondaryTalentsSpecId={member.characterInfo.secondaryTalentsSpecId}
            />
          ))}
        </>
      )}
    </Box>
  )
}

export default Index
