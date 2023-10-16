import type IInvoice from './IInvoice'

export interface RequestLoginType {
  code: string
  password: string
}

export interface IInvoiceCreateRequest extends IInvoice {
  cashierId: number
  sellerId: number
  clientId: number
  products: Array<{
    id: number
    value: number
    amount: number
  }>
}

export interface IInvoiceReportCashierRequest {
  cashierId: number
  startDate: Date | string
  endDate: Date | string
}

export interface IIClientUniqueInputUpdate {
  clientId: number
  input: string
  value: string | number
}
