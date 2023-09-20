import { Prisma } from '@prisma/client'
import type IClient from '../../src/interfaces/IClient'

export const responseClientMock = {
  id: 1,
  cpf: '00000000000',
  balance: new Prisma.Decimal(30.32),
  createdAt: new Date(),
  userId: 1,
  user: {
    name: 'Fulano',
    code: '001',
    email: 'fulano@teste',
    password: '123456',
    cellPhone: '99999999999',
    branch: 'Branch',
    type: 'SS'
  }
}

export const clientArg: IClient = {
  id: 1,
  name: 'Fulano',
  code: '001',
  password: '123456',
  cellPhone: '99999999999',
  email: 'fulano@teste',
  branch: 'Branch',
  type: 'SS',
  cpf: '00000000000',
  balance: new Prisma.Decimal(30.32)
}
