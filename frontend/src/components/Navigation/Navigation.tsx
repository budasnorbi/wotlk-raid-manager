import { FC } from "react"

interface NavigationProps {
  setSnack: React.Dispatch<
    React.SetStateAction<
      | {
          message: string
          severity: "error" | "success"
        }
      | undefined
    >
  >
}
export const Navigation: FC<NavigationProps> = (props) => {
  return <div></div>
}
