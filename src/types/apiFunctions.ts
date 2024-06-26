import { ErrorResponse } from '@/types/error';
import { AuthResponse, SignUpResponse, UserType } from "./authType";
import { Account, CreateAccount } from "./account";
import { CreatePayment, Payment } from './payment';
import { Report, ReportsParams } from './report';

export interface ApiFunctions {
  
  account: {
    get: () => Promise<Account[]>;
    create:(data:CreateAccount)=>Promise<Account|ErrorResponse>
  };
  payment:{
    create: (data: FormData)=>Promise<Payment| ErrorResponse>
  }
  user:{
    login:(data:UserType)=>Promise<AuthResponse | ErrorResponse>
    signup:(data:UserType)=>Promise<SignUpResponse | ErrorResponse>
    me:()=>Promise<any>
  },
  report:{
    get: (params:ReportsParams)=> Promise<Report | ErrorResponse> 
  }
}
