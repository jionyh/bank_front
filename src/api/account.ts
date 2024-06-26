"use server";
import { baseURL, fetchOptions } from "@/config/api";
import { Account, CreateAccount,  } from "@/types/account";
import { ErrorResponse } from "@/types/error";
import { revalidateTag } from "next/cache";

export const create = async (data:CreateAccount):Promise<Account | ErrorResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/account`, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });

  const json =  await res.json();
  revalidateTag("allAccounts");
  return json
}
  


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

