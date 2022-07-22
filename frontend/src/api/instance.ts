import axios, { AxiosError } from "axios"

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_DOMAIN_FROM_PUBLIC,
  withCredentials: true,
  timeout: 5000
})
