import Client from '../domains/user/Client'
import type User from '../domains/user/User'
import type IClient from '../interfaces/IClient'
import CustomError from '../utils/CustomError'
import UserService from './UserService'
import { type IClientInvoicesRequest, type IClientCreateRequest, type IUniqueInputUpdate, type RequestLoginType } from '../interfaces'
import Branch from '../domains/Branch'
import Level from '../domains/Level'
import JwtToken, { type JwtPayloadClientType } from '../utils/JwtToken'
import Invoice from '../domains/Invoice'
import Cashier from '../domains/Cashier'
import convertDateToUTC from '../utils/convertDateToUTC'

class ClientService extends UserService {

  constructor () {
    super()
  }

  protected createDomain (client: IClient): User {
    return new Client(client)
  }

  public async login (payload: RequestLoginType): Promise<string> {
    const client = await this.prisma.client.findFirst({
      where: {
        user: {
          email: payload.email,
          password: payload.password
        }
      },
      include: { user: true }
    })
    if (client === null) throw new CustomError('Forbidden', 403)
    const jwtPayload: JwtPayloadClientType = { id: client.id, name: client.user.name, roleId: 5 }
    const jwt = new JwtToken()
    const token = jwt.generateTokenClient(jwtPayload)
    return token
  }

  public async createOne (newClient: IClientCreateRequest): Promise<User> {
    newClient.balance = 0
    newClient.password = newClient.password || '335577'

    const existEmail = await this.prisma.client.findFirst({
      where: { user: { email: newClient.email } }
    })
    if (existEmail !== null) throw new CustomError('Email already exist', 409)

    const clientModel = await this.prisma.client.create({
      include: { user: true },
      data: {
        balance: newClient.balance,
        user: {
          create: {
            name: newClient.name,
            password: newClient.password,
            email: newClient.email,
            cellPhone: newClient.cellPhone,
            branchId: newClient.branchId,
            levelId: newClient.levelId,
            admin: false
          }
        }
      }
    })

    const client = this.createDomain({
      id: clientModel.id,
      name: clientModel.user.name,
      password: clientModel.user.password,
      cellPhone: clientModel.user.cellPhone,
      email: clientModel.user.email,
      balance: clientModel.balance,
      admin: clientModel.user.admin
    })

    return client
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
      balance: clientModel.balance,
      userId: clientModel.userId,
      admin: clientModel.user.admin
    })
    await this.prisma.$disconnect()
    return client
  }

  public async getByName (request: string): Promise<User[]> {
    const clientModel = await this.prisma.client.findMany({
      where: {
        user: { name: { contains: request } }
      },
      include: {
        user: {
          include: { branch: true, level: true }
        }
      }
    })
    const clients = clientModel.map((client) => (
      this.createDomain({
        id: client.id,
        name: client.user.name,
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
        balance: client.balance,
        admin: client.user.admin
      })
    ))
    return clients
  }

  public async getByEmail (request: string): Promise<User> {
    const clientModel = await this.prisma.client.findFirst({
      where: {
        user: { email: request }
      },
      include: {
        user: {
          include: { branch: true, level: true }
        }
      }
    })
    if (clientModel === null) throw new CustomError('Not Found', 404)
    const client = this.createDomain({
      id: clientModel.id,
      name: clientModel.user.name,
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
      balance: clientModel.balance,
      admin: true
    })
    return client
  }

  public async getAll (): Promise<User[]> {
    const clientsModels = await this.prisma.client.findMany({
      include: { user: { include: { branch: true, level: true } } },
      orderBy: { user: { name: 'asc' } }
    })
    const clients: User[] = clientsModels.map((client) => {
      return this.createDomain({
        id: client.id,
        name: client.user.name,
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
        balance: client.balance,
        admin: client.user.admin
      })
    })
    return clients
  }

  public async getByIdWithInvoices (request: IClientInvoicesRequest): Promise<User> {
    const clientModel = await this.prisma.client.findUnique({
      where: { id: request.clientId },
      include: {
        invoice: {
          where: { saleDate: {
            gte: convertDateToUTC(new Date(request.startDate)),
            lte: convertDateToUTC(new Date(request.endDate), false)
          }},
          take: request.limit,
          include: { cashier: true }
        },
        user: true
      }
    })
    if (clientModel === null) throw new CustomError('Not found', 404)
    const client = this.createDomain({
      id: clientModel.id,
      name: clientModel.user.name,
      password: clientModel.user.password,
      cellPhone: clientModel.user.cellPhone,
      email: clientModel.user.email,
      balance: clientModel.balance,
      admin: clientModel.user.admin,
      invoices: clientModel.invoice.map((v) => (
        new Invoice({
          id: v.id,
          saleDate: v.saleDate,
          value: v.value,
          cashier: new Cashier({
            id: v.cashierId,
            title: v.cashier.title
          })
        })
      ))
    })
    return client
  }

  public async updateUniqueInput (request: IUniqueInputUpdate): Promise<User> {
    const data = request.input === 'cpf' || request.input === 'balance'
      ? { [request.input]: request.value }
      : { user: { update: { [request.input]: request.value } } }
    const clientModel = await this.prisma.client.update({
      where: {
        id: request.itemId
      },
      include: { user: { include: { branch: true, level: true } } },
      data
    })
    const client = this.createDomain({
      id: clientModel.id,
      name: clientModel.user.name,
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
      balance: clientModel.balance,
      admin: clientModel.user.admin
    })
    return client
  }

  public async changePass (clientId: number, newPass: string, oldPass: string): Promise<User> {
    const clientModel = await this.prisma.client.update({
      where: { id: clientId, user: { password: oldPass } },
      data: { user: { update: { password: newPass } } },
      include: { user: { include: { branch: true, level: true } } }
    })
    const client = this.createDomain({
      id: clientModel.id,
      name: clientModel.user.name,
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
      balance: clientModel.balance,
      admin: clientModel.user.admin
    })
    return client
  }
}

export default ClientService
