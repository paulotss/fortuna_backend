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

export interface IUniqueInputUpdate {
  itemId: number
  input: string
  value: string | number
}

export interface IClientCreateRequest {
  id?: number
  name: string
  cellPhone: string
  email: string
  branchId: number
  levelId: number
  cpf: string
  code?: string
  password?: string
  balance?: number
}

export interface IExpenseCreateRequest {
  amount: number
  value: number
  launchDate: string
  productId: number
}

export interface IExpenseLaunchDateRequest {
  startDate: Date | string
  endDate: Date | string
}

export interface ILossCreateRequest {
  amount: number
  description: string
  createAt: string
  productId: number
}
