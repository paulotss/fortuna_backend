import { type Decimal } from '@prisma/client/runtime/library'
import type Product from '../domains/Product'

export default interface IExpense {
  id?: number
  amount: number
  value: Decimal
  launchDate: Date
  product?: Product
}
