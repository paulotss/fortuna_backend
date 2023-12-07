import { type Decimal } from '@prisma/client/runtime/library'
import type Invoice from '../domains/Invoice'

interface IProduct {
  id?: number
  title: string
  price: Decimal
  amount: number
  barCode: string
  invoices?: Invoice[]
}

export default IProduct
