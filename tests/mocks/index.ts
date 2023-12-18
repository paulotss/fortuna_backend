import { Prisma } from '@prisma/client'
import type IClient from '../../src/interfaces/IClient'
import Branch from '../../src/domains/Branch'
import Level from '../../src/domains/Level'

const branch = {
  id: 1,
  title: 'Branch'
}

const level = {
  id: 1,
  title: 'Level 1',
  acronym: 'L1'
}

export const responseClientMock = {
  id: 1,
  createdAt: new Date(),
  cpf: '00000000000',
  balance: new Prisma.Decimal(30.32),
  userId: 1,
  user: {
    id: 1,
    name: 'Fulano',
    code: '001',
    password: '123456',
    cellPhone: '99999999999',
    email: 'fulano@teste',
    branch: {
      id: 1,
      title: 'Branch'
    },
    level: {
      id: 1,
      title: 'Level 1',
      acronym: 'L1'
    }
  }
}

// export const responseClientMock = {
//   user: {
//     id: 1,
//     name: 'Fulano',
//     code: '001',
//     password: '123456',
//     cellPhone: '99999999999',
//     email: 'fulano@teste',
//     branch: {
//       id: 1,
//       title: 'Branch'
//     },
//     level: {
//       id: 1,
//       title: 'Level 1',
//       acronym: 'L1'
//     }
//   },
//   id: 1,
//   cpf: '00000000000',
//   balance: new Prisma.Decimal(30.32)
// }

export const clientArg: IClient = {
  id: 1,
  name: 'Fulano',
  code: '001',
  password: '123456',
  cellPhone: '99999999999',
  email: 'fulano@teste',
  branch: new Branch(branch),
  level: new Level(level),
  cpf: '00000000000',
  balance: new Prisma.Decimal(30.32),
  userId: 1
}
