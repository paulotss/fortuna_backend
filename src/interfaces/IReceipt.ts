import { type Decimal } from '@prisma/client/runtime/library'
import type Client from '../domains/user/Client'
import type Method from '../domains/Method'

interface IReceipt {
  id?: number
  amount: Decimal
  createdAt: Date
  client?: Client
  method?: Method
}

export default IReceipt
