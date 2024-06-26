import { ApiFunctions } from "@/types/apiFunctions";
import { login, me, signup } from "./user";
import { get as getAccount, create as createAccount } from "./account";
import { get as getReport } from "./report";
import {create as createPayment}from './payment'

const api: ApiFunctions = {
  account: {get: getAccount, create: createAccount},
  payment:{create:createPayment},
  user:{login,me, signup},
  report:{
    get: getReport,
  }
};

export default api;
