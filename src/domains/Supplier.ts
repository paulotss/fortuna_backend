import type ISupplier from '../interfaces/ISupplier'

class Supplier {
  private id: number | undefined
  private name: string

  constructor (supplier: ISupplier) {
    this.id = supplier.id
    this.name = supplier.name
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
}

export default Supplier
