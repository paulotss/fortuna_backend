import type IClient from '../../interfaces/IClient'
import type Invoice from '../Invoice'
import User from './User'
import { type Prisma } from '@prisma/client'

class Client extends User {
  private balance: Prisma.Decimal
  private invoices?: Invoice[]
  private userId: number | undefined

  constructor (client: IClient) {
    super(client)
    this.balance = client.balance
    this.invoices = client.invoices
    this.userId = client.userId
  }

  public getBalance (): Prisma.Decimal {
    return this.balance
  }

  public setBalance (balance: Prisma.Decimal): void {
    this.balance = balance
  }

  public getUserId (): number | undefined {
    return this.userId
  }

  public setUserId (userId: number): void {
    this.userId = userId
  }

  public getInvoices (): Invoice[] | undefined {
    return this.invoices
  }

  public setInvoices (invoices: Invoice[]): void {
    this.invoices = invoices
  }
}

export default Client
