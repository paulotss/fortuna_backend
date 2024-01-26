import { type Decimal } from '@prisma/client/runtime/library'
import type Client from '../domains/user/Client'
import type Cashier from '../domains/Cashier'
import User from '../domains/user/User'

export default interface IInvoice {
  id?: number
  value: Decimal
  saleDate: Date
  client?: Client
  seller?: User
  cashier?: Cashier
}
