import Invoice from '../domains/Invoice'
import { type IInvoiceReportCashierRequest, type IInvoiceCreateRequest, type IClientInvoicesRequest, type IInvoicesToProductResponse } from '../interfaces'
import type IInvoice from '../interfaces/IInvoice'
import { type PrismaClient } from '@prisma/client'
import prisma from '../utils/prisma'
import Client from '../domains/user/Client'
import Seller from '../domains/user/Seller'
import Cashier from '../domains/Cashier'
import CustomError from '../utils/CustomError'
import Branch from '../domains/Branch'
import Level from '../domains/Level'

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

  public async getByCashier (request: IInvoiceReportCashierRequest): Promise<Invoice[]> {
    const invoicesModels = await this.prisma.invoice.findMany({
      where: {
        cashier: request.cashierId !== 0 ? { id: request.cashierId } : { id: { gt: 0 } },
        saleDate: { gte: new Date(request.startDate), lte: new Date(request.endDate) }
      },
      include: {
        client: { include: { user: { include: { branch: true, level: true } } } },
        seller: { include: { user: { include: { branch: true, level: true } } } },
        cashier: true
      }
    })
    const invoices = invoicesModels.map((invoice) => this.createDomain({
      id: invoice.id,
      saleDate: invoice.saleDate,
      value: invoice.value,
      client: new Client({
        id: invoice.client.id,
        name: invoice.client.user.name,
        cellPhone: invoice.client.user.cellPhone,
        email: invoice.client.user.email,
        branch: new Branch({
          id: invoice.client.user.branch.id,
          title: invoice.client.user.branch.title
        }),
        level: new Level({
          id: invoice.client.user.level.id,
          title: invoice.client.user.level.title,
          acronym: invoice.client.user.level.acronym
        }),
        cpf: invoice.client.cpf,
        balance: invoice.client.balance
      }),
      seller: new Seller({
        id: invoice.seller.id,
        name: invoice.seller.user.name,
        cellPhone: invoice.seller.user.cellPhone,
        email: invoice.seller.user.email,
        branch: new Branch({
          id: invoice.seller.user.branch.id,
          title: invoice.seller.user.branch.title
        }),
        level: new Level({
          id: invoice.seller.user.level.id,
          title: invoice.seller.user.level.title,
          acronym: invoice.seller.user.level.acronym
        }),
        createdAt: invoice.seller.createdAt
      }),
      cashier: new Cashier({
        id: invoice.cashier.id,
        title: invoice.cashier.title
      })
    }))
    return invoices
  }

  public async getByClientId (request: IClientInvoicesRequest): Promise<Invoice[]> {
    const invoicesModels = await this.prisma.invoice.findMany({
      where: {
        client: { id: request.clientId },
        saleDate: { gte: new Date(request.startDate), lte: new Date(request.endDate) }
      },
      include: {
        client: { include: { user: { include: { branch: true, level: true } } } },
        seller: { include: { user: { include: { branch: true, level: true } } } },
        cashier: true
      }
    })
    const invoices = invoicesModels.map((invoice) => this.createDomain({
      id: invoice.id,
      saleDate: invoice.saleDate,
      value: invoice.value,
      client: new Client({
        id: invoice.client.id,
        name: invoice.client.user.name,
        cellPhone: invoice.client.user.cellPhone,
        email: invoice.client.user.email,
        branch: new Branch({
          id: invoice.client.user.branch.id,
          title: invoice.client.user.branch.title
        }),
        level: new Level({
          id: invoice.client.user.level.id,
          title: invoice.client.user.level.title,
          acronym: invoice.client.user.level.acronym
        }),
        cpf: invoice.client.cpf,
        balance: invoice.client.balance
      }),
      seller: new Seller({
        id: invoice.seller.id,
        name: invoice.seller.user.name,
        cellPhone: invoice.seller.user.cellPhone,
        email: invoice.seller.user.email,
        branch: new Branch({
          id: invoice.seller.user.branch.id,
          title: invoice.seller.user.branch.title
        }),
        level: new Level({
          id: invoice.seller.user.level.id,
          title: invoice.seller.user.level.title,
          acronym: invoice.seller.user.level.acronym
        }),
        createdAt: invoice.seller.createdAt
      }),
      cashier: new Cashier({
        id: invoice.cashier.id,
        title: invoice.cashier.title
      })
    }))
    return invoices
  }

  public async getById (invoiceId: number): Promise<Invoice> {
    const invoiceModel = await this.prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        client: { include: { user: { include: { branch: true, level: true } } } },
        seller: { include: { user: { include: { branch: true, level: true } } } },
        cashier: true
      }
    })
    if (invoiceModel === null) throw new CustomError('Not found', 404)
    const invoice = this.createDomain({
      id: invoiceModel.id,
      saleDate: invoiceModel.saleDate,
      value: invoiceModel.value,
      client: new Client({
        id: invoiceModel.client.id,
        name: invoiceModel.client.user.name,
        cellPhone: invoiceModel.client.user.cellPhone,
        email: invoiceModel.client.user.email,
        branch: new Branch({
          id: invoiceModel.client.user.branch.id,
          title: invoiceModel.client.user.branch.title
        }),
        level: new Level({
          id: invoiceModel.client.user.level.id,
          title: invoiceModel.client.user.level.title,
          acronym: invoiceModel.client.user.level.acronym
        }),
        cpf: invoiceModel.client.cpf,
        balance: invoiceModel.client.balance
      }),
      seller: new Seller({
        id: invoiceModel.seller.id,
        name: invoiceModel.seller.user.name,
        cellPhone: invoiceModel.seller.user.cellPhone,
        email: invoiceModel.seller.user.email,
        branch: new Branch({
          id: invoiceModel.seller.user.branch.id,
          title: invoiceModel.seller.user.branch.title
        }),
        level: new Level({
          id: invoiceModel.seller.user.level.id,
          title: invoiceModel.seller.user.level.title,
          acronym: invoiceModel.seller.user.level.acronym
        }),
        createdAt: invoiceModel.seller.createdAt
      }),
      cashier: new Cashier({
        id: invoiceModel.cashier.id,
        title: invoiceModel.cashier.title
      })
    })
    return invoice
  }

  public async getInvoicesOfProduct (productId: number): Promise<IInvoicesToProductResponse[]> {
    const invoicesIds = await this.prisma.invoiceToProduct.findMany({
      where: { productId },
      include: { invoice: true }
    })
    const result = invoicesIds.map((itp) => (
      { amount: itp.amount, value: itp.value, saleDate: itp.invoice.saleDate }
    ))
    return result
  }
}

export default InvoiceService
