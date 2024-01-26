import { type Decimal } from '@prisma/client/runtime/library'
import type Invoice from '../domains/Invoice'
import Supplier from '../domains/Supplier'

interface IProduct {
  id?: number
  title: string
  description: string
  price: Decimal
  amount: number
  barCode: string
  invoices?: Invoice[]
  supplier?: Supplier
}

export default IProduct
