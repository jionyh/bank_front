import NextAuth from 'next-auth'
import { AuthUser } from './authType'
import { JWT } from "next-auth/jwt"

declare module 'next-auth/jwt'{
  interface JWT {
    accessToken: string
    iat: number
    exp: number
    jti: string
  }
}



declare module 'next-auth' {
  interface Session {
    user: {
      accessToken:string
    },
  }
}