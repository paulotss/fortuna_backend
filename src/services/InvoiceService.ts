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
        products: { connect: invoice.productsId.map((id) => ({ id })) }
      }
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
