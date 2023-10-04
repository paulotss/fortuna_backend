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

  public async getById (id: number): Promise<Cashier> {
    const cashier = await this.prisma.cashier.findUnique({
      where: { id }
    })
    if (cashier === null) throw new CustomError('Not found', 404)
    return this.createDomain(cashier)
  }
}

export default CashierService
