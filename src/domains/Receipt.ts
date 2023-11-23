import { type Decimal } from '@prisma/client/runtime/library'
import type IReceipt from '../interfaces/IReceipt'
import type Client from './user/Client'
import type Method from './Method'

class Receipt {
  private id: number | undefined
  private amount: Decimal
  private client: Client | undefined
  private method: Method | undefined

  constructor (receipt: IReceipt) {
    this.id = receipt.id
    this.amount = receipt.amount
    this.client = receipt.client
    this.method = receipt.method
  }

  public getId (): number | undefined {
    return this.id
  }

  public setId (id: number): void {
    this.id = id
  }

  public getAmount (): Decimal {
    return this.amount
  }

  public setAmount (amount: Decimal): void {
    this.amount = amount
  }

  public getClient (): Client | undefined {
    return this.client
  }

  public setClient (client: Client): void {
    this.client = client
  }

  public getMethod (): Method | undefined {
    return this.method
  }

  public setMethod (method: Method): void {
    this.method = method
  }
}

export default Receipt
