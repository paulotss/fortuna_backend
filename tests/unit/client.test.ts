import { expect, test, vi } from 'vitest'
import ClientService from '../../src/services/ClientService'
import prisma from '../../src/utils/__mocks__/prisma'
import Client from '../../src/domains/user/Client'
import { Prisma } from '@prisma/client'
import type IClient from '../../src/interfaces/IClient'

vi.mock('../../src/utils/prisma')

test('shold return a client with valid id', async () => {
  // Arrange
  const responseMock = {
    id: 1,
    cpf: '00000000000',
    balance: new Prisma.Decimal(30.32),
    userId: 1,
    user: {
      name: 'Fulano',
      code: '001',
      email: 'fulano@teste',
      password: '123456',
      cell_phone: '99999999999',
      branch: 'Branch',
      type: 'SS'
    }
  }
  const clientArg: IClient = {
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
  const client: Client = new Client(clientArg)
  prisma.client.findUnique.mockResolvedValue(responseMock)

  // Act
  const clientService = await new ClientService().getById(1)

  // Assert
  expect(clientService).toStrictEqual(client)
})
