import Product from '../domains/Product'
import type IProduct from '../interfaces/IProduct'
import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'
import CustomError from '../utils/CustomError'
import { type IProductToInvoicesResponse, type IUniqueInputUpdate } from '../interfaces'

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

  public async getRecentlySoldProducts (limit: number): Promise<Product[]> {
    const invoicesModel = await this.prisma.invoice.findMany({
      take: limit,
      orderBy: [{ saleDate: 'desc' }],
      include: { products: { include: { product: true } } }
    })
    const products: Product[] = []
    invoicesModel.forEach((invoice) => {
      invoice.products.forEach((p) => {
        if (!products.some((v) => v.getId() === p.product.id)) {
          products.push(this.createDomain(p.product))
        }
      })
    })
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

  public async getProductsOfInvoice (invoiceId: number): Promise<IProductToInvoicesResponse[]> {
    const model = await this.prisma.invoiceToProduct.findMany({
      where: { invoiceId },
      include: { product: true }
    })
    const result = model.map((m) => (
      {
        amount: m.amount,
        value: m.value,
        product: this.createDomain(m.product)
      }
    ))
    return result
  }
}

export default ProductService
