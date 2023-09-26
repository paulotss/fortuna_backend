import { type PrismaClient } from '@prisma/client'
import UserService from './UserService'
import prisma from '../utils/prisma'
import type ISeller from '../interfaces/ISeller'
import Seller from '../domains/user/Seller'
import type User from '../domains/user/User'
import { type RequestLoginType } from '../interfaces'
import CustomError from '../utils/CustomError'
import JwtToken, { type JwtPayloadType } from '../utils/JwtToken'

class SellerService extends UserService {
  private readonly prisma: PrismaClient
  private readonly accessLevel: number

  constructor () {
    super()
    this.prisma = prisma
    this.accessLevel = 1
  }

  protected createDomain (seller: ISeller): User {
    return new Seller(seller)
  }

  public async login (payload: RequestLoginType): Promise<string> {
    const result = await this.prisma.seller.findFirst({
      where: {
        user: {
          code: payload.code,
          password: payload.password
        }
      }
    })
    if (result === null) throw new CustomError('Forbidden', 403)
    const jwtPayload: JwtPayloadType = { code: payload.code, accessLevel: this.accessLevel }
    const jwt = new JwtToken()
    const token = jwt.generateToken(jwtPayload)
    return token
  }
}

export default SellerService
