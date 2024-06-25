"use server";
import { baseURL, fetchOptions } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { Report, ReportsParams } from "@/types/report";


export const get = async (params:ReportsParams): Promise<Report | ErrorResponse> => {
  'use server'

  const {account_id,startDate,endDate} = params;
  const queryString = new URLSearchParams({
    account_id: account_id,
    startDate: startDate || '',
    endDate: endDate || ''
  }).toString();

  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/report/transactions?${queryString}`, {
    ...options,
    cache: "no-store",
  });
  const json =  await res.json();
  return json
};

