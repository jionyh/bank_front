export interface Account {
  id: number;
  name:string
  user_id:number
  accountType: 'CURRENT' | 'SAVINGS'
  balance:number
}
