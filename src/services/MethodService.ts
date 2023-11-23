import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'
import type IMethod from '../interfaces/IMethod'
import Method from '../domains/Method'

class MethodService {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }

  private createDomain (method: IMethod): Method {
    return new Method(method)
  }

  public async getAll (): Promise<Method[]> {
    const methodModel = await this.prisma.method.findMany()
    const method = methodModel.map((mt) => (
      this.createDomain(mt)
    ))
    return method
  }
}

export default MethodService
