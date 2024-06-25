"use server";
import { baseURL, fetchOptions } from "@/config/api";
import { Account,  } from "@/types/account";


export const get = async (): Promise<Account[]> => {
  'use server'

  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/account`, {
    ...options,
    cache: "no-store",
    next: { tags: ["allAccounts"] },
  });
  const json =  await res.json();
  return json
};

