import { type Decimal } from '@prisma/client/runtime/library'
import type IInvoice from '../interfaces/IInvoice'

class Invoice {
  private id: number | undefined
  private value: Decimal
  private saleDate: Date

  constructor (invoice: IInvoice) {
    this.id = invoice.id
    this.value = invoice.value
    this.saleDate = invoice.saleDate
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
}

export default Invoice
