import Product from '../domains/Product'
import type IProduct from '../interfaces/IProduct'
import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'
import CustomError from '../utils/CustomError'
import { type IUniqueInputUpdate } from '../interfaces'
import InvoiceService from './InvoiceService'

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

  public async getRecents (limit: number): Promise<Product[]> {
    const invoiceInstance = new InvoiceService()
    const invoices = await invoiceInstance.getRecents(5)
    const invoiceIds = invoices.map((invoice) => invoice.getId() ?? 0)
    const productsModel = await this.prisma.product.findMany({
      take: limit,
      where: { id: { in: invoiceIds } }
    })
    const products = productsModel.map((product) => (
      this.createDomain(product)
    ))
    return products
  }

  public async getOne (productId: number): Promise<Product> {
    const productModel: IProduct | null = await prisma.product.findUnique({ where: { id: productId } })
    if (productModel === null) throw new CustomError('Not found', 404)
    const product = this.createDomain(productModel)
    return product
  }

  public async getByTitle (request: string): Promise<Product[]> {
    const productsModel = await this.prisma.product.findMany({
      take: 5,
      where: {
        title: { contains: request }
      }
    })
    const products = productsModel.map((product) => (
      this.createDomain(product)
    ))
    return products
  }

  public async updateUniqueInput (request: IUniqueInputUpdate): Promise<Product> {
    const productModel = await this.prisma.product.update({
      where: { id: request.itemId },
      data: { [request.input]: request.value }
    })
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
