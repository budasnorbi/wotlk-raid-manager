import React, { useState } from "react"
import { AppProps } from "next/app"
import { CacheProvider, EmotionCache } from "@emotion/react"
import { CssBaseline, Box, Container, Alert, Snackbar } from "@mui/material"
import ThemeProvider from "@mui/system/ThemeProvider/ThemeProvider"
import dynamic from "next/dynamic"
const { createTheme } = require("@mui/material/styles")

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import { createEmotionCache } from "@utils/createEmtionCache"
import { lightThemeOptions } from "@styles/theme/lightThemeOption"
import { Navigation } from "@components/Navigation/Navigation"

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
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

const clientSideEmotionCache = createEmotionCache()
const lightTheme = createTheme(lightThemeOptions)

const MyApp: React.FC<MyAppProps> = (props: any) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, router } = props
  const [snack, setSnack] = useState<
    undefined | { message: string; severity: "error" | "success" }
  >()

  if (router.pathname.startsWith("/auth")) {
    return <Component {...pageProps} />
  }

  const handleSnackClose = () => setSnack(undefined)

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Snackbar open={Boolean(snack)} autoHideDuration={5000} onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity={snack?.severity} sx={{ width: "100%" }}>
            {snack?.message}
          </Alert>
        </Snackbar>
        <Navigation setSnack={setSnack} />
        <Box py={3} width="100%">
          <Container maxWidth="lg">
            <Component {...pageProps} setSnack={setSnack} />
          </Container>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
