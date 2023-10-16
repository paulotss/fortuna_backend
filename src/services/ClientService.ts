import Client from '../domains/user/Client'
import type User from '../domains/user/User'
import type IClient from '../interfaces/IClient'
import CustomError from '../utils/CustomError'
import UserService from './UserService'
import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'
import { type IIClientUniqueInputUpdate } from '../interfaces'
import Branch from '../domains/Branch'
import Level from '../domains/Level'

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
        user: { include: { branch: true, level: true } }
      }
    })
    if (clientModel === null) throw new CustomError('Not found', 404)
    const client: User = this.createDomain({
      id: clientModel.id,
      name: clientModel.user.name,
      code: clientModel.user.code,
      password: clientModel.user.password,
      cellPhone: clientModel.user.cellPhone,
      email: clientModel.user.email,
      branch: new Branch({
        id: clientModel.user.branch.id,
        title: clientModel.user.branch.title
      }),
      level: new Level({
        id: clientModel.user.level.id,
        title: clientModel.user.level.title,
        acronym: clientModel.user.level.acronym
      }),
      cpf: clientModel.cpf,
      balance: clientModel.balance
    })
    await this.prisma.$disconnect()
    return client
  }

  public async getAll (): Promise<User[]> {
    const clientsModels = await this.prisma.client.findMany({
      include: { user: { include: { branch: true, level: true } } }
    })
    const clients: User[] = clientsModels.map((client) => {
      return this.createDomain({
        id: client.id,
        name: client.user.name,
        code: client.user.code,
        password: client.user.password,
        cellPhone: client.user.cellPhone,
        email: client.user.email,
        branch: new Branch({
          id: client.user.branch.id,
          title: client.user.branch.title
        }),
        level: new Level({
          id: client.user.level.id,
          title: client.user.level.title,
          acronym: client.user.level.acronym
        }),
        cpf: client.cpf,
        balance: client.balance
      })
    })
    return clients
  }

  public async updateUniqueInput (request: IIClientUniqueInputUpdate): Promise<User> {
    const data = request.input === 'cpf' || request.input === 'balance'
      ? { [request.input]: request.value }
      : { user: { update: { [request.input]: request.value } } }
    const clientModel = await this.prisma.client.update({
      where: {
        id: request.clientId
      },
      include: { user: { include: { branch: true, level: true } } },
      data
    })
    const client = this.createDomain({
      id: clientModel.id,
      name: clientModel.user.name,
      code: clientModel.user.code,
      password: clientModel.user.password,
      cellPhone: clientModel.user.cellPhone,
      email: clientModel.user.email,
      branch: new Branch({
        id: clientModel.user.branch.id,
        title: clientModel.user.branch.title
      }),
      level: new Level({
        id: clientModel.user.level.id,
        title: clientModel.user.level.title,
        acronym: clientModel.user.level.acronym
      }),
      cpf: clientModel.cpf,
      balance: clientModel.balance
    })
    return client
  }
}

export default ClientService
