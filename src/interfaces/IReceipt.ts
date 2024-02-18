import { type Decimal } from '@prisma/client/runtime/library'
import type Client from '../domains/user/Client'
import type Method from '../domains/Method'
import User from '../domains/user/User'

interface IReceipt {
  id?: number
  amount: Decimal
  createdAt: Date
  client?: Client
  method?: Method
  operator?: User
}

export default IReceipt
