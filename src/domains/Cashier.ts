import type ICashier from '../interfaces/ICashier'

class Cashier {
  private id: number | undefined
  private title: string

  constructor (cashier: ICashier) {
    this.id = cashier.id
    this.title = cashier.title
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
}

export default Cashier
