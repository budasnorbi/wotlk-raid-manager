import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { socket } from "../utils/socket"
import { Opcodes } from "@type/opcodes"
import { Raid } from "@type/raid"
import { RollResult } from "@type/roll-result"
import { PARTY_GROUP_CONVERTED_TO_RAID } from "@type/socket-responses"

const Index: NextPage = () => {
  const [raid, setRaid] = useState<Raid | null>(null)
  const [rollResults, setRollResults] = useState<RollResult[]>([])

  useEffect(() => {
    socket.on("RAID_DETAILS", (data: any) => {
      console.log("RAID_DETAILS: ", data)
    })

    socket.on("PARTY_GROUP_CONVERTED_TO_RAID", (data: PARTY_GROUP_CONVERTED_TO_RAID) => {
      console.log("PARTY_GROUP_CONVERTED_TO_RAID: ", data)
    })
    socket.on("PLAYER_JOINED_TO_THE_RAID", (data: any) => {
      console.log("PLAYER_JOINED_TO_THE_RAID: ", data)
    })
    socket.on("PLAYER_LEAVED_THE_RAID", (data: any) => {
      console.log("PLAYER_LEAVED_THE_RAID: ", data)
    })

    socket.on("RAID_LEADER_UPDATED", (data: any) => {
      console.log("RAID_LEADER_UPDATED: ", data)
    })

    socket.on("RAID_DIFFICULTY_UPDATED", (data: any) => {
      console.log("RAID_DIFFICULTY_UPDATED: ", data)
    })

    socket.on("RAID_LOOTMETHOD_UPDATED", (data: any) => {
      console.log("RAID_LOOTMETHOD_UPDATED: ", data)
    })

    socket.on("RAID_LOOT_TRESHOLD_UPDATED", (data: any) => {
      console.log("RAID_LOOT_TRESHOLD_UPDATED: ", data)
    })

    socket.on("RAID_ROLL_STARTED", (data: any) => {
      console.log("RAID_ROLL_STARTED: ", data)
    })

    socket.on("RAID_PLAYER_ROLLED", (data: any) => {
      console.log("RAID_PLAYER_ROLLED: ", data)
    })

    socket.on("RAID_ROLL_ENDED", (data: any) => {
      console.log("RAID_ROLL_ENDED: ", data)
    })

    return () => {}
  }, [])
  return (
    <div>
      {!raid ? (
        <div>
          <h2>Waiting to convert the group to a raid...</h2>
        </div>
      ) : (
        <div>
          <h2>Raid Manager v0.1</h2>
          {raid.members.length !== 0 && (
            <div>
              <ul>
                {raid.members.map((member) => (
                  <li key={member.name}>
                    <span>{member.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Index
