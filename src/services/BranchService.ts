import { type PrismaClient } from '@prisma/client'
import Branch from '../domains/Branch'
import type IBranch from '../interfaces/IBranch'
import prisma from '../utils/prisma'

class BranchService {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }

  private createDomain (branch: IBranch): Branch {
    return new Branch(branch)
  }

  public async getAll (): Promise<Branch[]> {
    const branchModel = await this.prisma.branch.findMany()
    const branchs = branchModel.map((branch) => (this.createDomain(branch)))
    return branchs
  }
}

export default BranchService
