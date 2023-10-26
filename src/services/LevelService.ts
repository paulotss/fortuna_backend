import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'
import type ILevel from '../interfaces/ILevel'
import Level from '../domains/Level'

class LevelService {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }

  private createDomain (level: ILevel): Level {
    return new Level(level)
  }

  public async getAll (): Promise<Level[]> {
    const levelModels = await this.prisma.level.findMany()
    const levels = levelModels.map((level) => (
      this.createDomain(level)
    ))
    return levels
  }
}

export default LevelService
