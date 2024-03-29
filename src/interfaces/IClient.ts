import type Invoice from '../domains/Invoice'
import type IUser from './IUser'
import { type Prisma } from '@prisma/client'

interface IClient extends IUser {
  balance: Prisma.Decimal
  invoices?: Invoice[]
  userId?: number
}

export default IClient
