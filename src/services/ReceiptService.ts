import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'
import type IReceipt from '../interfaces/IReceipt'
import Receipt from '../domains/Receipt'
import { type IReceiptCreateRequest } from '../interfaces'

class ReceiptService {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }

  private createDomain (receipt: IReceipt): Receipt {
    return new Receipt(receipt)
  }

  public async createOne (request: IReceiptCreateRequest): Promise<Receipt> {
    const receiptMethod = await this.prisma.receipts.create({
      data: request
    })
    const receipt = this.createDomain({
      id: receiptMethod.id,
      amount: receiptMethod.amount
    })
    return receipt
  }
}

export default ReceiptService
