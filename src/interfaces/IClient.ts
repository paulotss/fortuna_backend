import type IUser from './IUser'
import { type Prisma } from '@prisma/client'

interface IClient extends IUser {
  cpf: string
  balance: Prisma.Decimal
}

export default IClient
