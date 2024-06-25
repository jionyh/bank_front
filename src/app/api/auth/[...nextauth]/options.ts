import { ErrorResponse } from '@/types/error';

import api from '@/api'
import { AuthUser } from '@/types/authType'
import type { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';




export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 8, // 8 horas
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials?.email && !credentials?.password) {
          throw new Error('invalid Credentials')
        }
        const { email, password } = credentials
        const response = await api.user.login({email,password})
        if ('error' in response){
          throw new Error(response.message)
        }
        return response
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }:{token:JWT, user: User | AdapterUser | AuthUser}){
      if (user) {
        const { accessToken } = user as AuthUser
        token.accessToken = accessToken
      }
      return token
    },
    async session({ token, session }) {
      if (token) {
        session.user ={
          accessToken: token.accessToken,
        }
      }
      return session;
    }
  },
}