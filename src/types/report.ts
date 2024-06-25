import { Payment } from "./payment"

export interface Report {
paymentsAmount: number
payments?: Payment[]
}

export interface ReportsParams {
  account_id: string
  startDate?: string
  endDate?: string
}

