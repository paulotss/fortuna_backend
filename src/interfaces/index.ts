import type IInvoice from './IInvoice'

export interface RequestLoginType {
  code: string
  password: string
}

export interface IInvoiceCreateRequest extends IInvoice {
  cashierId: number
  sellerId: number
  clientId: number
  productsId: number[]
}
