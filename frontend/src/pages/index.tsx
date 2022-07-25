import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { socket } from "../utils/socket"
import { Opcodes } from "@type/opcodes"
import { Raid } from "@type/raid"

const Index: NextPage = () => {
  const [raid, setRaid] = useState<Raid | null>(null)
  useEffect(() => {
    socket.on(Opcodes.SMSG_GROUP_LIST.toString(), (raid: Raid) => {
      console.log(raid)
      setRaid(raid)
    })
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
