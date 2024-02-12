import type ICashier from '../interfaces/ICashier'
import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'
import Cashier from '../domains/Cashier'
import CustomError from '../utils/CustomError'
import { IUniqueInputUpdate } from '../interfaces'

class CashierService {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }

  private createDomain (cashier: ICashier): Cashier {
    return new Cashier(cashier)
  }

  public async getAll (): Promise<Cashier[]> {
    const cashiersModels = await this.prisma.cashier.findMany()
    const cashiers = cashiersModels.map((cashier) => this.createDomain(cashier))
    return cashiers
  }

  public async getById (id: number): Promise<Cashier> {
    const cashier = await this.prisma.cashier.findUnique({
      where: { id }
    })
    if (cashier === null) throw new CustomError('Not found', 404)
    return this.createDomain(cashier)
  }

  public async createOne (request: ICashier): Promise<Cashier> {
    const cashierModel = await this.prisma.cashier.create({
      data: { title: request.title }
    })
    const cashier = this.createDomain(cashierModel)
    return cashier
  }

  public async updateUniqueInput (request: IUniqueInputUpdate): Promise<Cashier> {
    const cashierModel = await this.prisma.cashier.update({
      where: { id: request.itemId },
      data: { [request.input]: request.value }
    })
    const product = this.createDomain(cashierModel)
    return product
  }

  public async getAllWithProducts (): Promise<Cashier[]> {
    const cashiersModel = await this.prisma.cashier.findMany({
      include: { 
        products: {
          include: { product: true },
          orderBy: { product: { title: 'asc' } }
        }
      }
    })
    const cashiers = cashiersModel.map((cashier) => (
      this.createDomain({
        id: cashier.id,
        title: cashier.title,
        products: cashier.products.map((pc) => ({
          id: pc.product.id,
          title: pc.product.title,
          description: pc.product.description,
          price: pc.product.price,
          barCode: pc.product.barCode,
          amount: pc.amount,
          supplierId: pc.product.supplierId
        }))
      })
    ))
    return cashiers
  }
}

export default CashierService
