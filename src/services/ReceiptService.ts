import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'
import type IReceipt from '../interfaces/IReceipt'
import Receipt from '../domains/Receipt'
import { type IReceiptMethodRequest, type IReceiptCreateRequest } from '../interfaces'

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

  public async getByMethod (request: IReceiptMethodRequest): Promise<Receipt[]> {
    const receiptModel = await this.prisma.receipts.findMany({
      where: {
        method: { id: request.methodId },
        createdAt: { gte: request.startDate, lte: request.endDate }
      }
    })
    const receipts = receiptModel.map((receipt) => (
      this.createDomain({
        id: receipt.id,
        amount: receipt.amount
      })
    ))
    return receipts
  }
}

export default ReceiptService
