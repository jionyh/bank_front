import { baseURL, fetchOptions } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { CreatePayment, Payment } from "@/types/payment";
import { revalidateTag } from "next/cache";

export const create = async (data:CreatePayment):Promise<Payment | ErrorResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/payment/create`, {
    ...options,
    method: "POST",
    body: JSON.stringify({
      account_id: parseInt(data.account_id),
      amount: parseFloat(data.amount),
      description: data.description,
      imageUrl: data.imageUrl ? data.imageUrl : undefined
    }),
  });

  const json =  await res.json();
  revalidateTag("allAccounts");
  return json
};

