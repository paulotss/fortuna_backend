import { type Decimal } from '@prisma/client/runtime/library'
import type IInvoice from '../interfaces/IInvoice'
import type Client from './user/Client'
import type Seller from './user/Seller'
import type Cashier from './Cashier'

class Invoice {
  private id: number | undefined
  private value: Decimal
  private saleDate: Date
  private client?: Client
  private seller?: Seller
  private cashier?: Cashier

  constructor (invoice: IInvoice) {
    this.id = invoice.id
    this.value = invoice.value
    this.saleDate = invoice.saleDate
    this.client = invoice.client
    this.seller = invoice.seller
    this.cashier = invoice.cashier
  }

  public getId (): number | undefined {
    return this.id
  }

  public setId (id: number): void {
    this.id = id
  }

  public getValue (): Decimal {
    return this.value
  }

  public setValue (value: Decimal): void {
    this.value = value
  }

  public getSaleDate (): Date {
    return this.saleDate
  }

  public setSaleDate (saleDate: Date): void {
    this.saleDate = saleDate
  }

  public getClient (): Client | undefined {
    return this.client
  }

  public setClient (client: Client): void {
    this.client = client
  }

  public getSeller (): Seller | undefined {
    return this.seller
  }

  public setSeller (seller: Seller): void {
    this.seller = seller
  }

  public getCashier (): Cashier | undefined {
    return this.cashier
  }

  public setCashier (cashier: Cashier): void {
    this.cashier = cashier
  }
}

export default Invoice
