import type ILoss from '../interfaces/ILoss'

class Loss {
  private id: number | undefined
  private amount: number
  private description: string
  private createAt: Date

  constructor (loss: ILoss) {
    this.id = loss.id
    this.amount = loss.amount
    this.description = loss.description
    this.createAt = loss.createAt
  }

  public getId (): number | undefined {
    return this.id
  }

  public setId (id: number | undefined): void {
    this.id = id
  }

  public getAmount (): number {
    return this.amount
  }

  public setAmount (amount: number): void {
    this.amount = amount
  }

  public getDescription (): string {
    return this.description
  }

  public setDescription (description: string): void {
    this.description = description
  }

  public getCreateAt (): Date {
    return this.createAt
  }

  public setCreateAd (createAt: Date): void {
    this.createAt = createAt
  }
}

export default Loss
