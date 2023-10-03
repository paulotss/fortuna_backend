import { type Decimal } from '@prisma/client/runtime/library'

export default interface IInvoice {
  id?: number
  value: Decimal
  saleDate: Date
}
