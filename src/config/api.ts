import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'


async function getTokens() {
  try {
    const res = await getServerSession(authOptions);
    if (!res || !res.user.accessToken) return '';
    return res.user.accessToken;
  } catch (e) {
    return '';
  }
}

export const fetchOptions = async () => {
  return {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await getTokens()}`,
    },
  } as RequestInit;
};

export const baseURL = "http://localhost:4000";
//export const baseURL = "https://estoqueapi.jiony.dev";



