import { type PrismaClient } from '@prisma/client'
import Loss from '../domains/Loss'
import type ILoss from '../interfaces/ILoss'
import prisma from '../utils/prisma'
import { type ILossCreateRequest } from '../interfaces'

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
}

export default LossService
