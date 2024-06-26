export interface Account {
  id: number;
  name:string
  user_id:number
  accountType: 'CURRENT' | 'SAVINGS'
  balance:number
}

export interface CreateAccount{
  name: string
  accountType: string
  balance:number
}
