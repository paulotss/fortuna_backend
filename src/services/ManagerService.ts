import UserService from './UserService'
import prisma from '../utils/prisma'
import { type PrismaClient } from '@prisma/client'
import Manager from '../domains/user/Manager'
import type IManager from '../interfaces/IManager'
import type User from '../domains/user/User'
import CustomError from '../utils/CustomError'
import { type RequestLoginType } from '../interfaces'
import JwtToken, { type JwtPayloadType } from '../utils/JwtToken'

class ManagerServive extends UserService {
  private readonly prisma: PrismaClient
  private readonly accessLevel: number

  constructor () {
    super()
    this.prisma = prisma
    this.accessLevel = 0
  }

  protected createDomain (manager: IManager): User {
    return new Manager(manager)
  }

  public async login (payload: RequestLoginType): Promise<string> {
    const manager = await this.prisma.manager.findFirst({
      where: {
        user: {
          code: payload.code,
          password: payload.password
        }
      }
    })
    if (manager === null) throw new CustomError('Forbidden', 403)
    const jwtPayload: JwtPayloadType = { id: manager.userId, accessLevel: this.accessLevel }
    const jwt = new JwtToken()
    const token = jwt.generateToken(jwtPayload)
    return token
  }

  public async getByUserId (userId: number): Promise<User | null> {
    const managerModel = await this.prisma.manager.findFirst({
      where: { userId },
      include: { user: true }
    })
    if (managerModel === null) return null
    const manager = this.createDomain({
      createdAt: managerModel.createdAt,
      ...managerModel.user
    })
    return manager
  }

  public async createOne (userId: number): Promise<User> {
    const managerExist = await this.prisma.manager.findFirst({ where: { userId } })
    if (managerExist !== null) throw new CustomError('Already exists', 409)
    const managerModel = await this.prisma.manager.create({
      data: { userId },
      include: { user: true }
    })
    const manager = this.createDomain({
      createdAt: managerModel.createdAt,
      ...managerModel.user
    })
    return manager
  }
}

export default ManagerServive
