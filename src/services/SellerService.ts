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
    const seller = await this.prisma.seller.findFirst({
      where: {
        user: {
          code: payload.code,
          password: payload.password
        }
      }
    })
    if (seller === null) throw new CustomError('Forbidden', 403)
    const jwtPayload: JwtPayloadType = { id: seller.userId, accessLevel: this.accessLevel }
    const jwt = new JwtToken()
    const token = jwt.generateToken(jwtPayload)
    return token
  }

  public async createOne (userId: number): Promise<User> {
    const sellerExist = await this.prisma.seller.findFirst({ where: { userId } })
    if (sellerExist !== null) throw new CustomError('Already exists', 409)
    const sellerModel = await this.prisma.seller.create({
      data: { userId },
      include: { user: true }
    })
    const seller = this.createDomain({
      createdAt: sellerModel.createdAt,
      ...sellerModel.user
    })
    return seller
  }

  public async getByUserId (userId: number): Promise<User | null> {
    const sellerModel = await this.prisma.seller.findFirst({
      where: { userId },
      include: { user: true }
    })
    if (sellerModel === null) return null
    const seller = this.createDomain({
      createdAt: sellerModel.createdAt,
      ...sellerModel.user
    })
    return seller
  }
}

export default SellerService
