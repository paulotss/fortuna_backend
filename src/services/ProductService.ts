import Product from '../domains/Product'
import type IProduct from '../interfaces/IProduct'
import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'
import CustomError from '../utils/CustomError'
import { type IProductToInvoicesResponse, type IUniqueInputUpdate, type IProductCreateRequest, IProductAmountUpdate } from '../interfaces'
import ICashier from '../interfaces/ICashier'

class ProductService {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }

  private createDomain (product: IProduct): Product {
    return new Product(product)
  }

  public async getAll (title?: string): Promise<Product[]> {
    const productModel = await this.prisma.product.findMany({
      where: { title: { contains: title } },
      include: { supplier: true },
      orderBy: { title: 'asc' }
    })
    const products = productModel.map((p) => this.createDomain(p))
    return products
  }

  public async getByCashierId (cashierId: number, title?: string): Promise<Product[]> {
    const productModel = await this.prisma.product.findMany({
      where: { cashiers: { some: { cashierId } }, title: { contains: title } },
      include: { supplier: true }
    })
    const product = productModel.map((p) => (this.createDomain(p)))
    return product
  }

  public async getOne (productId: number): Promise<Product> {
    const productModel = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        supplier: true,
        cashiers: { include: { cashier: true } }
      }
    })
    const cashiers: ICashier[] | undefined = productModel?.cashiers.map((c) => ({
      id: c.cashierId,
      title: c.cashier.title,
      productAmount: c.amount
    }))
    if (productModel === null) throw new CustomError('Not found', 404)
    const product = this.createDomain({
      id: productModel.id,
      title: productModel.title,
      description: productModel.description,
      price: productModel.price,
      barCode: productModel.barCode,
      supplierId: productModel.supplierId,
      supplier: productModel.supplier,
      cashiers: cashiers
    })
    return product
  }

  public async setAmount (request: IProductAmountUpdate): Promise<IProductAmountUpdate> {
    const { productId, cashierId, amount } = request
    const productCashierModel = await this.prisma.producstHasCashiers.upsert({
      where: { productId_cashierId: { productId, cashierId } },
      update: { amount },
      create: { productId, cashierId, amount }
    })
    return productCashierModel
  }

  public async getRecentlySoldProducts (limit: number, cashierId: number): Promise<Product[]> {
    const invoicesModel = await this.prisma.invoice.findMany({
      take: limit,
      orderBy: [{ saleDate: 'desc' }],
      where: { products: { some: { product: { cashiers: { some: { cashierId } } } } } },
      include: { products: { include: { product: { include: { cashiers: true, supplier: true } } } } }
    })
    const products: Product[] = []
    invoicesModel.forEach((invoice) => {
      invoice.products.forEach((p) => {
        if (!products.some((v) => v.getId() === p.product.id)) {
          products.push(this.createDomain({
            id: p.product.id,
            title: p.product.title,
            description: p.product.description,
            amount: p.product.cashiers.find((p) => (p.cashierId === cashierId))?.amount,
            price: p.product.price,
            barCode: p.product.barCode,
            supplierId: p.product.supplierId,
            supplier: p.product.supplier,
          }))
        }
      })
    })
    return products
  }

  public async getByTitle (request: string): Promise<Product[]> {
    const productsModel = await this.prisma.product.findMany({
      where: {
        title: { contains: request }
      },
      include: { cashiers: { include: { cashier: true } }, supplier: true }
    })
    const products = productsModel.map((product) => (
      this.createDomain({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        barCode: product.barCode,
        supplierId: product.supplierId,
        supplier: product.supplier,
        cashiers: product.cashiers.map((c) => c.cashier)
      })
    ))
    return products
  }

  public async getByTitleAndCashierId (request: string, cashierId: number): Promise<Product[]> {
    const productsModel = await this.prisma.product.findMany({
      where: {
        title: { contains: request },
        cashiers: { some: { cashierId } }
      },
      include: { cashiers: { include: { cashier: true } }, supplier: true }
    })
    const products = productsModel.map((product) => (
      this.createDomain({
        id: product.id,
        title: product.title,
        description: product.description,
        amount: product.cashiers.find((p) => (p.cashierId === cashierId))?.amount,
        price: product.price,
        barCode: product.barCode,
        supplierId: product.supplierId,
        supplier: product.supplier,
        cashiers: product.cashiers.map((c) => c.cashier)
      })
    ))
    return products
  }

  public async getByBarCode (request: string, cashierId: number): Promise<Product> {
    const productModel = await this.prisma.product.findFirst({
      where: { barCode: request, cashiers: { some: { cashierId, amount: { gt: 0 } } } },
      include: { cashiers: true }
    })
    if (productModel === null) throw new CustomError('Not Found', 404)
    const product = this.createDomain({
      id: productModel.id,
      title: productModel.title,
      description: productModel.description,
      amount: productModel.cashiers.find((p) => (p.cashierId === cashierId))?.amount,
      price: productModel.price,
      barCode: productModel.barCode,
      supplierId: productModel.supplierId,
    })
    return product
  }

  public async updateUniqueInput (request: IUniqueInputUpdate): Promise<Product> {
    const productModel = await this.prisma.product.update({
      where: { id: request.itemId },
      data: { [request.input]: request.value }
    })
    const product = this.createDomain(productModel)
    return product
  }

  public async createOne (newProduct: IProductCreateRequest): Promise<Product> {
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
