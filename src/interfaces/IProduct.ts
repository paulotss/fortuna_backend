import { type Decimal } from '@prisma/client/runtime/library'
import ISupplier from './ISupplier'
import ICashier from './ICashier'
import IInvoice from './IInvoice'

interface IProduct {
  id?: number
  title: string
  description: string
  price: Decimal
  barCode: string
  amount?: number
  supplierId: number
  supplier?: ISupplier
  invoices?: IInvoice[]
  cashiers?: ICashier[]
}

export default IProduct
