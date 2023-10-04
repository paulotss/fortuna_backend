import Invoice from '../domains/Invoice'
import { type IInvoiceCreateRequest } from '../interfaces'
import type IInvoice from '../interfaces/IInvoice'
import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'

class InvoiceService {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }

  private createDomain (invoice: IInvoice): Invoice {
    return new Invoice(invoice)
  }

  public async createOne (invoice: IInvoiceCreateRequest): Promise<Invoice> {
    const invoiceModel = await this.prisma.invoice.create({
      data: {
        value: invoice.value,
        saleDate: invoice.saleDate,
        cashierId: invoice.cashierId,
        sellerId: invoice.sellerId,
        clientId: invoice.clientId,
        products: {
          create: invoice.products.map((product) => ({
            value: product.value,
            amount: product.amount,
            product: {
              connect: { id: product.id }
            }
          }))
        }
      }
    })
    for (let i = 0; i < invoice.products.length; i += 1) {
      await this.prisma.product.update({
        where: { id: invoice.products[i].id },
        data: { amount: { decrement: invoice.products[i].amount } }
      })
    }
    await this.prisma.client.update({
      where: { id: invoice.clientId },
      data: { balance: { decrement: invoice.value } }
    })
    const newInvoice = this.createDomain({
      id: invoiceModel.id,
      value: invoiceModel.value,
      saleDate: invoiceModel.saleDate
    })
    return newInvoice
  }
}

export default InvoiceService
