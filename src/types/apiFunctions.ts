import { ErrorResponse } from '@/types/error';
import { AuthResponse, UserType } from "./authType";
import { Account } from "./account";
import { CreatePayment, Payment } from './payment';
import { Report, ReportsParams } from './report';

export interface ApiFunctions {
  
  account: {
    get: () => Promise<Account[]>;
  };
  payment:{
    create: (data:CreatePayment)=>Promise<Payment| ErrorResponse>
  }
  user:{
    login:(data:UserType)=>Promise<AuthResponse | ErrorResponse>
    me:()=>Promise<any>
  },
  report:{
    get: (params:ReportsParams)=> Promise<Report | ErrorResponse> 
  }
}
