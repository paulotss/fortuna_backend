import User from '../domains/user/User'
import type IUser from '../interfaces/IUser'
import { type JwtPayload } from 'jsonwebtoken'
import JwtToken from '../utils/JwtToken'
import { RequestLoginRoleType, RequestLoginType } from '../interfaces'
import CustomError from '../utils/CustomError'
import prisma from '../utils/prisma'
import { PrismaClient } from '@prisma/client'
import { type JwtPayloadRoleType, type JwtPayloadAdminType } from '../utils/JwtToken'

class UserService {
  protected readonly prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }

  protected createDomain (user: IUser): User {
    return new User(user)
  }

  public async loginRole (payload: RequestLoginRoleType): Promise<string> {
    const user = await this.prisma.user.findFirst({
      where: {
          email: payload.email,
          password: payload.password,
          roles: { some: { roleId: payload.roleId, cashierId: payload.cashierId } }
      },
      include: { roles: { include: { role: true, cashier: true } } }
    })
    if (user === null) throw new CustomError('Forbidden', 403)
    const jwtPayload: JwtPayloadRoleType = {
      id: user.id,
      name: user.name,
      roleId: payload.roleId,
      cashierId: payload.cashierId,
    }
    const jwt = new JwtToken()
    const token = jwt.generateTokenRole(jwtPayload)
    return token
  }

  public async loginAdmin (payload: RequestLoginType): Promise<string> {
    const user = await this.prisma.user.findFirst({
      where: {
          email: payload.email,
          password: payload.password,
      },
    })
    if (user === null || !user.admin) throw new CustomError('Forbidden', 403)
    const jwtPayload: JwtPayloadAdminType = {
      id: user.id,
      name: user.name,
      roleId: 0
    }
    const jwt = new JwtToken()
    const token = jwt.generateTokenAdmin(jwtPayload)
    return token
  }

  protected generatePass (): string {
    const pass = Math.floor((Math.random() * 999999) + 100000)
    return pass.toString().substring(0, 6)
  }

  public async verify (token: string): Promise<JwtPayload> {
    const jwt = new JwtToken()
    const result = await jwt.getPayload(token)
    return result
  }
}

export default UserService
