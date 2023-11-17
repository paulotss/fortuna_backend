import type ICashier from '../interfaces/ICashier'
import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'
import Cashier from '../domains/Cashier'
import CustomError from '../utils/CustomError'

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

  public async updateOne (request: ICashier): Promise<Cashier> {
    const cashierModel = await this.prisma.cashier.update({
      where: { id: request.id },
      data: { title: request.title }
    })
    const cashier = this.createDomain(cashierModel)
    return cashier
  }
}

export default CashierService
