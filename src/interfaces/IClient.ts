import type IUser from './IUser'
import { type Prisma } from '@prisma/client'

interface IClient extends IUser {
  cpf: string
  balance: Prisma.Decimal
  userId?: number
}

export default IClient
