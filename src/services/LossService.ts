import { type PrismaClient } from '@prisma/client'
import Loss from '../domains/Loss'
import type ILoss from '../interfaces/ILoss'
import prisma from '../utils/prisma'
import { type ILossCreateAtRequest, type ILossCreateRequest } from '../interfaces'
import Product from '../domains/Product'
import convertDateToUTC from '../utils/convertDateToUTC'

class LossService {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }

  private createDomain (loss: ILoss): Loss {
    return new Loss(loss)
  }

  public async createOne (request: ILossCreateRequest): Promise<Loss> {
    const lossModel = await this.prisma.loss.create({
      data: request
    })
    const loss = this.createDomain({
      id: lossModel.id,
      amount: lossModel.amount,
      description: lossModel.description,
      createAt: lossModel.createAt
    })
    return loss
  }

  public async getByCreateAt (request: ILossCreateAtRequest): Promise<Loss[]> {
    const lossesModel = await this.prisma.loss.findMany({
      where: { createAt: {
        gte: convertDateToUTC(new Date(request.startDate)),
        lte: convertDateToUTC(new Date(request.endDate))
      }},
      include: { product: true }
    })
    const losses = lossesModel.map((loss) => (
      this.createDomain({
        id: loss.id,
        amount: loss.amount,
        description: loss.description,
        createAt: loss.createAt,
        product: new Product(loss.product)
      })
    ))
    return losses
  }
}

export default LossService
