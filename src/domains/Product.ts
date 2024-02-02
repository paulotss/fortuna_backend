import { type Decimal } from '@prisma/client/runtime/library'
import type IProduct from '../interfaces/IProduct'
import type Invoice from './Invoice'
import ISupplier from '../interfaces/ISupplier'
import ICashier from '../interfaces/ICashier'
import IInvoice from '../interfaces/IInvoice'

class Product {
  private id: number | undefined
  private title: string
  private description: string
  private price: Decimal
  private barCode: string
  private amount: number | undefined
  private supplierId: number;
  private supplier: ISupplier | undefined
  private cashiers: ICashier[] | undefined
  private invoices: IInvoice[] | undefined

  constructor (product: IProduct) {
    this.id = product.id
    this.title = product.title
    this.description = product.description
    this.price = product.price
    this.barCode = product.barCode
    this.amount = product.amount
    this.supplierId = product.supplierId
    this.invoices = product.invoices
    this.supplier = product.supplier
    this.cashiers = product.cashiers
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

  public getDescription (): string {
    return this.description
  }

  public setDescription (description: string): void {
    this.description = description
  }

  public getPrice (): Decimal {
    return this.price
  }

  public setPrice (price: Decimal): void {
    this.price = price
  }

  public getBarCode (): string {
    return this.barCode
  }

  public setBarCode (barCode: string): void {
    this.barCode = barCode
  }

  public getAmount (): number | undefined {
    return this.amount
  }

  public setAmount (amount: number | undefined): void {
    this.amount = amount
  }

  public setSupplierId (): number | undefined {
    return this.supplierId
  }

  public getSupplierId (supplierId: number): void {
    this.supplierId = supplierId
  }

  public getInvoices (): IInvoice[] | undefined {
    return this.invoices
  }

  public setInvoices (invoices: IInvoice[]): void {
    this.invoices = invoices
  }

  public getSupllier (): ISupplier | undefined {
    return this.supplier
  }

  public setSupplier (supplier: ISupplier): void {
    this.supplier = supplier
  }

  public getCashier (): ICashier[] | undefined {
    return this.cashiers
  }

  public setCashier (cashiers: ICashier[]): void {
    this.cashiers = cashiers
  }
}

export default Product
