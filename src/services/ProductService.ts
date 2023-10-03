import Product from '../domains/Product'
import type IProduct from '../interfaces/IProduct'
import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'

class ProductService {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }

  private createDomain (product: IProduct): Product {
    return new Product(product)
  }

  public async getAll (): Promise<Product[]> {
    const productsModels: IProduct[] = await prisma.product.findMany()
    const products: Product[] = productsModels.map((product) => {
      return this.createDomain(product)
    })
    return products
  }
}

export default ProductService
