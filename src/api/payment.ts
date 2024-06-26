import { baseURL, fetchOptions } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { CreatePayment, Payment } from "@/types/payment";
import { revalidateTag } from "next/cache";

export const create = async (data: FormData):Promise<Payment | ErrorResponse> => {
  "use server";
  
  const options = await fetchOptions()
  console.log(data)

  const res = await fetch(`${baseURL}/payment/create`, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>', // Modify content type for FormData
    },
    method: "POST",
    body:data
  });

  const json =  await res.json();
  revalidateTag("allAccounts");
  return json
};

