import type ISupplier from '../interfaces/ISupplier'
import Product from './Product'

class Supplier {
  private id: number | undefined
  private name: string
  private products?: Product[]

  constructor (supplier: ISupplier) {
    this.id = supplier.id
    this.name = supplier.name
    this.products = supplier.products
  }

  public getId (): number | undefined {
    return this.id
  }

  public setId (id: number): void {
    this.id = id
  }

  public getName (): string {
    return this.name
  }

  public setName (name: string): void {
    this.name = name
  }

  public getProducts (): Product[] | undefined {
    return this.products
  }

  public setProducts (products: Product[] | undefined): void {
    this.products = products
  }
}

export default Supplier
