import { baseURL, fetchOptions } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { CreatePayment, Payment } from "@/types/payment";
import { revalidateTag } from "next/cache";

export const create = async (data: FormData):Promise<Payment | ErrorResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const bearerToken = (options.headers as { [key: string]: string })['Authorization']

  const res = await fetch(`${baseURL}/payment/create`, {
    headers: {
      Authorization: bearerToken
    },
    method: "POST",
    body:data
  });

  const json =  await res.json();
  revalidateTag("allAccounts");
  return json
};

