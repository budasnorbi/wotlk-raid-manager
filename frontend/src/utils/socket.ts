import { io } from "socket.io-client"
/* @ts-ignore */

export const socket = io(process.env.NEXT_PUBLIC_BACKEND_DOMAIN_FROM_PUBLIC)
