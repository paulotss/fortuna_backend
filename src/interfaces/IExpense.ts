import { type Decimal } from '@prisma/client/runtime/library'

export default interface IExpense {
  id?: number
  amount: number
  value: Decimal
  launchDate: Date
}
