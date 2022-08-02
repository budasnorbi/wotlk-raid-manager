import { Box, Paper, Typography } from "@mui/material"
import { CharacterInfo } from "@type/scraped-types"
import Image from "next/image"
import type { FC } from "react"

interface Props {
  name: string
  primaryTalentsSpecId: CharacterInfo["primaryTalentsSpecId"]
  secondaryTalentsSpecId: CharacterInfo["secondaryTalentsSpecId"]
  activedTalentIndex: CharacterInfo["activeTalentIndex"]
}

export const Member: FC<Props> = (props) => {
  console.log(props.activedTalentIndex)
  return (
    <Paper sx={{ flexBasis: "calc(20%)", padding: 1, marginRight: "10px" }} variant="outlined">
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography variant="subtitle2">{props.name}</Typography>
        <div
          style={{
            display: "flex"
          }}
        >
          {props.primaryTalentsSpecId && (
            <div style={{ marginRight: "5px", display: "flex", alignItems: "center" }}>
              <Image
                alt={`spec-${props.primaryTalentsSpecId}`}
                src={`/images/class-specs/${props.primaryTalentsSpecId}.jpg`}
                width={18}
                height={18}
                style={{
                  borderRadius: "50%",
                  opacity: props.activedTalentIndex === 0 ? 1 : 0.4
                }}
              />
            </div>
          )}

          {props.secondaryTalentsSpecId && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Image
                alt={`spec-${props.secondaryTalentsSpecId}`}
                src={`/images/class-specs/${props.secondaryTalentsSpecId}.jpg`}
                width={18}
                height={18}
                style={{
                  borderRadius: "50%",
                  opacity: props.activedTalentIndex === 1 ? 1 : 0.4
                }}
              />
            </div>
          )}
        </div>
      </Box>
    </Paper>
  )
}
