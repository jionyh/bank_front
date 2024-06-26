export interface Payment {
id:number
account_id: number
amount:number
date: string
description:string
imageUrl?:string
}

export interface CreatePayment {
  account_id: string
  amount:string
  description:string
  image?:string
}
