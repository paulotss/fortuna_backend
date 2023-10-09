import { type Decimal } from '@prisma/client/runtime/library'
import type Client from '../domains/user/Client'
import type Seller from '../domains/user/Seller'
import type Cashier from '../domains/Cashier'

export default interface IInvoice {
  id?: number
  value: Decimal
  saleDate: Date
  client?: Client
  seller?: Seller
  cashier?: Cashier
}
