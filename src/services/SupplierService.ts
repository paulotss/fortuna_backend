import { PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'
import ISupplier from '../interfaces/ISupplier'
import Supplier from '../domains/Supplier'

class SupplierService {
  private prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }

  private createDomain (supplier: ISupplier) {
    return new Supplier(supplier)
  }

  public async getAll () {
    const supplierModel = await this.prisma.supplier.findMany()
    const suppliers = supplierModel.map((sup) => this.createDomain(sup))
    return suppliers
  }
}

export default SupplierService
