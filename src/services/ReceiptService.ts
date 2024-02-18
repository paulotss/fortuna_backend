import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'
import type IReceipt from '../interfaces/IReceipt'
import Receipt from '../domains/Receipt'
import Client from  '../domains/user/Client'
import { type IReceiptMethodRequest, type IReceiptCreateRequest, IClientReceiptRequest } from '../interfaces'
import convertDateToUTC from '../utils/convertDateToUTC'
import CustomError from '../utils/CustomError'
import Method from '../domains/Method'
import Branch from '../domains/Branch'
import Level from '../domains/Level'
import User from '../domains/user/User'

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
      amount: receiptMethod.amount,
      createdAt: receiptMethod.createdAt
    })
    return receipt
  }

  public async getByMethod (request: IReceiptMethodRequest): Promise<Receipt[]> {
    const receiptModel = await this.prisma.receipts.findMany({
      where: {
        method: { id: request.methodId },
        createdAt: {
          gte: convertDateToUTC(new Date(request.startDate)),
          lte: convertDateToUTC(new Date(request.endDate), false)
        }
      },
      include: { client: { include: { user: true } } }
    })
    const receipts = receiptModel.map((receipt) => (
      this.createDomain({
        id: receipt.id,
        amount: receipt.amount,
        createdAt: receipt.createdAt,
        client: new Client({
          id: receipt.client.id,
          name: receipt.client.user.name,
          cellPhone: receipt.client.user.email,
          email: receipt.client.user.email,
          admin: receipt.client.user.admin,
          balance: receipt.client.balance,
        })
      })
    ))
    return receipts
  }

  public async getById (receiptId: number): Promise<Receipt> {
    const receiptModel = await this.prisma.receipts.findUnique({
      where: { id: receiptId },
      include: {
        method: true,
        client: { include: { user: { include: { branch: true, level: true } } } },
        operator: { include: { branch: true, level: true } }
      }
    });
    if (!receiptModel) throw new CustomError('Not Found', 404);
    const receipt = this.createDomain({
      id: receiptModel.id,
      amount: receiptModel.amount,
      createdAt: receiptModel.createdAt,
      client: new Client({
        id: receiptModel.client.id,
        name: receiptModel.client.user.name,
        cellPhone: receiptModel.client.user.email,
        email: receiptModel.client.user.email,
        admin: receiptModel.client.user.admin,
        balance: receiptModel.client.balance,
        branch: new Branch({
          id: receiptModel.operator.branch.id,
          title: receiptModel.operator.branch.title
        }),
        level: new Level({
          id: receiptModel.operator.level.id,
          title: receiptModel.operator.level.title,
          acronym: receiptModel.operator.level.acronym
        }),
      }),
      method: new Method({
        id: receiptModel.method.id,
        title: receiptModel.method.title
      }),
      operator: new User({
        id: receiptModel.operator.id,
        name: receiptModel.operator.name,
        cellPhone: receiptModel.operator.cellPhone,
        email: receiptModel.operator.email,
        branch: new Branch({
          id: receiptModel.operator.branch.id,
          title: receiptModel.operator.branch.title
        }),
        level: new Level({
          id: receiptModel.operator.level.id,
          title: receiptModel.operator.level.title,
          acronym: receiptModel.operator.level.acronym
        }),
        admin: receiptModel.operator.admin
      }),
    })
    return receipt
  }

  public async getByClient (request: IClientReceiptRequest): Promise<Receipt[]> {
    const receiptsModels = await this.prisma.receipts.findMany({
      where: {
        clientId: request.clientId,
        createdAt: {
          gte: convertDateToUTC(new Date(request.startDate)),
          lte: convertDateToUTC(new Date(request.endDate), false)
        }
      },
      include: { method: true, operator: true }
    })
    const receipts = receiptsModels.map((receipt) => this.createDomain(
      {
        id: receipt.id,
        amount: receipt.amount,
        createdAt: receipt.createdAt,
        method: new Method({
          id: receipt.method.id,
          title: receipt.method.title
        }),
        operator: new User({
          id: receipt.operator.id,
          name: receipt.operator.name,
          cellPhone: receipt.operator.cellPhone,
          email: receipt.operator.email,
          admin: receipt.operator.admin
        })
      }
    ))
    return receipts
  }
}

export default ReceiptService
