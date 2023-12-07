import { type Decimal } from '@prisma/client/runtime/library'
import type IInvoice from './IInvoice'
import type Client from '../domains/user/Client'
import type Product from '../domains/Product'

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

export interface ILossCreateAtRequest {
  startDate: Date | string
  endDate: Date | string
}

export interface IClientInvoicesRequest {
  clientId: number
  startDate: Date | string
  endDate: Date | string
  limit?: number
}

export interface IReceiptCreateRequest {
  amount: number
  clientId: number
  methodId: number
}

export interface IReceiptMethodRequest {
  methodId: number
  startDate: Date | string
  endDate: Date | string
}

export interface IInvoicesToProductResponse {
  invoiceId: number
  amount: number
  value: Decimal
  saleDate: Date
  client: Client
}

export interface IInvoicesToProductRequest {
  productId: number
  startDate: Date | string
  endDate: Date | string
}

export interface IProductToInvoicesResponse {
  amount: number
  value: Decimal
  product: Product
}
