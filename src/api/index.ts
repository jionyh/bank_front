import { ApiFunctions } from "@/types/apiFunctions";
import { login, me } from "./user";
import { get as getAccount } from "./account";
import { get as getReport } from "./report";
import {create}from './payment'

const api: ApiFunctions = {
  account: {get: getAccount},
  payment:{create},
  user:{login,me},
  report:{
    get: getReport,
  }
};

export default api;
