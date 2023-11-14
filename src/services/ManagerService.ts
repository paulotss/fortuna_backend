import UserService from './UserService'
import prisma from '../utils/prisma'
import { type PrismaClient } from '@prisma/client'
import Manager from '../domains/user/Manager'
import type IManager from '../interfaces/IManager'
import type User from '../domains/user/User'
import CustomError from '../utils/CustomError'

class ManagerServive extends UserService {
  private readonly prisma: PrismaClient

  constructor () {
    super()
    this.prisma = prisma
  }

  protected createDomain (manager: IManager): User {
    return new Manager(manager)
  }

  public async getByUserId (userId: number): Promise<User> {
    const managerModel = await this.prisma.manager.findFirst({
      where: { userId },
      include: { user: true }
    })
    if (managerModel === null) throw new CustomError('Not found', 404)
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
