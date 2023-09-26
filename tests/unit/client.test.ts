import { expect, test, vi } from 'vitest'
import ClientService from '../../src/services/ClientService'
import prisma from '../../src/utils/__mocks__/prisma'
import Client from '../../src/domains/user/Client'
import { responseClientMock, clientArg } from '../mocks'

vi.mock('../../src/utils/prisma')

test('shold return a client with valid id', async () => {
  // Arrange
  const id = 1
  const client: Client = new Client(clientArg)
  prisma.client.findUnique.mockResolvedValue(responseClientMock)

  // Act
  const clientService = await new ClientService().getById(id)

  // Assert
  expect(clientService).toStrictEqual(client)
})

test('shold throw an error with invalid id', async () => {
  // Arrange
  const id = 2
  prisma.client.findUnique.mockResolvedValue(null)

  // Act
  const clientService = new ClientService()

  // Assert
  await expect(clientService.getById(id)).rejects.toThrow()
  await expect(clientService.getById(id)).rejects.toThrowError('Not found')
})
