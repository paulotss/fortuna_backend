import { type Decimal } from '@prisma/client/runtime/library'
import type IProduct from '../interfaces/IProduct'
import type Invoice from './Invoice'

class Product {
  private id: number | undefined
  private title: string
  private price: Decimal
  private amount: number
  private barCode: string
  private invoices: Invoice[] | undefined

  constructor (product: IProduct) {
    this.id = product.id
    this.title = product.title
    this.price = product.price
    this.amount = product.amount
    this.barCode = product.barCode
    this.invoices = product.invoices
  }

  public getId (): number | undefined {
    return this.id
  }

  public setId (id: number): void {
    this.id = id
  }

  public getTitle (): string {
    return this.title
  }

  public setTitle (title: string): void {
    this.title = title
  }

  public getPrice (): Decimal {
    return this.price
  }

  public setPrice (price: Decimal): void {
    this.price = price
  }

  public getAmount (): number {
    return this.amount
  }

  public setAmount (amount: number): void {
    this.amount = amount
  }

  public getBarCode (): string {
    return this.barCode
  }

  public setBarCode (barCode: string): void {
    this.barCode = barCode
  }

  public getInvoices (): Invoice[] | undefined {
    return this.invoices
  }

  public setInvoices (invoices: Invoice[]): void {
    this.invoices = invoices
  }
}

export default Product
