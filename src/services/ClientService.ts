import Client from '../domains/user/Client'
import type User from '../domains/user/User'
import type IClient from '../interfaces/IClient'
import CustomError from '../utils/CustomError'
import UserService from './UserService'
import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'

class ClientService extends UserService {
  private readonly prisma: PrismaClient

  constructor () {
    super()
    this.prisma = prisma
  }

  protected createDomain (client: IClient): User {
    return new Client(client)
  }

  public async getById (clientId: number): Promise<User> {
    const clientModel = await this.prisma.client.findUnique({
      where: { id: clientId },
      include: {
        user: true
      }
    })
    if (clientModel === null) throw new CustomError('Not found', 404)
    const client: User = this.createDomain({
      id: clientModel.id,
      name: clientModel.user.name,
      code: clientModel.user.code,
      password: clientModel.user.password,
      cellPhone: clientModel.user.cell_phone,
      email: clientModel.user.email,
      branch: clientModel.user.branch,
      type: clientModel.user.type,
      cpf: clientModel.cpf,
      balance: clientModel.balance
    })
    await this.prisma.$disconnect()
    return client
  }
}

export default ClientService
