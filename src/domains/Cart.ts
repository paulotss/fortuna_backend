import ICart from '../interfaces/ICart'
import ICashier from '../interfaces/ICashier'
import IClient from '../interfaces/IClient'
import IProduct from '../interfaces/IProduct'

class Cart {
  private id: number | undefined
  private createdAt: Date
  private status: boolean
  private clientId: number
  private cashierId: number
  private cashier?: ICashier
  private client?: IClient
  private products?: IProduct[]

  constructor (cart: ICart) {
    this.id = cart.id
    this.createdAt = cart.createdAt
    this.status = cart.status
    this.clientId = cart.clientId
    this.cashierId = cart.cashierId
    this.cashier = cart.cashier
    this.client = cart.client
    this.products = cart.products
  }

  public getId (): number | undefined {
    return this.id
  }

  public setId (id: number): void {
    this.id = id
  }

  public getCreatedAt (): Date {
    return this.createdAt
  }

  public setCreatedAt (createdAt: Date): void {
    this.createdAt = createdAt
  }

  public getStatus (): boolean {
    return this.status
  }

  public setStatus (status: boolean): void {
    this.status = status
  }

  public getClientId (clientId: number): void {
    this.clientId = clientId
  }

  public setClientId (): number {
    return this.clientId
  }

  public getCashierId (): number {
    return this.cashierId
  }

  public setCashierId (cashierId: number): void {
    this.cashierId = cashierId
  }

  public getCashier (): ICashier | undefined {
    return this.cashier
  }

  public setCashier (cashier: ICashier): void {
    this.cashier = cashier
  }

  public getClient (): IClient | undefined {
    return this.client
  }

  public setClient (client: IClient): void {
    this.client = client
  }

  public getProducts (): IProduct[] | undefined {
    return this.products
  }

  public setProducts (products: IProduct[]): void {
    this.products = products
  }
}

export default Cart
