import Product from '../domains/Product'
import type IProduct from '../interfaces/IProduct'
import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'
import CustomError from '../utils/CustomError'

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

  public async getOne (productId: number): Promise<Product> {
    const productModel: IProduct | null = await prisma.product.findUnique({ where: { id: productId } })
    if (productModel === null) throw new CustomError('Not found', 404)
    const product = this.createDomain(productModel)
    return product
  }

  public async createOne (newProduct: IProduct): Promise<Product> {
    const productModel = await this.prisma.product.create({
      data: newProduct
    })
    const product = this.createDomain(productModel)
    return product
  }
}

export default ProductService
