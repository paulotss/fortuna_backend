import type ICashier from '../interfaces/ICashier'
import IProduct from '../interfaces/IProduct'

class Cashier {
  private id: number | undefined
  private title: string
  private productAmount?: number
  private products?: IProduct[]

  constructor (cashier: ICashier) {
    this.id = cashier.id
    this.title = cashier.title
    this.productAmount = cashier.productAmount
    this.products = cashier.products
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

  public getProductAmount (): number | undefined {
    return this.productAmount
  }

  public setProductAmount (productAmount: number): void {
    this.productAmount = productAmount
  }

  public getProducts (): IProduct[] | undefined {
    return this.products
  }

  public setProducts (products: IProduct[]): void {
    this.products = products
  }
}

export default Cashier
