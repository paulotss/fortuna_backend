import { PrismaClient } from '@prisma/client';
import prisma from '../utils/prisma';
import IRole from '../interfaces/IRole';
import Role from '../domains/Role';
import { IRoleUserResponse, IRoleUser } from '../interfaces';
import Cashier from '../domains/Cashier';

class RoleService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = prisma
  }

  private createDomain(role: IRole) {
    return new Role(role)
  }

  public async getAll (): Promise<Role[]> {
    const rolesModel = await this.prisma.role.findMany()
    const result = rolesModel.map((role) => this.createDomain(role))
    return result
  }

  public async getRolesByUserId (userId: number): Promise<IRoleUserResponse[]> {
    const roleModel = await this.prisma.userHasRole.findMany({
      where: {
        userId
      },
      include: { cashier: true, role: true }
    })
    const result = roleModel.map((role) => ({
      userId,
      role: this.createDomain(role.role),
      cashier: new Cashier(role.cashier)
    }))
    return result
  }

  public async addRoleToUser (request: IRoleUser): Promise<IRoleUser> {
    const roleModel = await this.prisma.userHasRole.create({
      data: {
        userId: request.userId,
        roleId: request.roleId,
        cashierId: request.cashierId
      }
    })
    return roleModel
  }

  public async removeRoleToUser (request: IRoleUser): Promise<IRoleUser> {
    const roleModel = await this.prisma.userHasRole.delete({
      where: {
        userId_roleId_cashierId: {
          userId: request.userId,
          roleId: request.roleId,
          cashierId:request.cashierId
        }
      }
    })
    return roleModel
  }
}

export default RoleService;
