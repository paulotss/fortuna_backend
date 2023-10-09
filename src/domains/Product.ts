import { type Decimal } from '@prisma/client/runtime/library'
import type IProduct from '../interfaces/IProduct'

class Product {
  private id: number | undefined
  private title: string
  private price: Decimal
  private amount: number
  private barCode: string

  constructor (product: IProduct) {
    this.id = product.id
    this.title = product.title
    this.price = product.price
    this.amount = product.amount
    this.barCode = product.barCode
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
}

export default Product
