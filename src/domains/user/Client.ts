import type IClient from '../../interfaces/IClient'
import User from './User'
import { type Prisma } from '@prisma/client'

class Client extends User {
  private cpf: string
  private balance: Prisma.Decimal

  constructor (client: IClient) {
    super(client)
    this.cpf = client.cpf
    this.balance = client.balance
  }

  public getCpf (): string {
    return this.cpf
  }

  public setCpf (cpf: string): void {
    this.cpf = cpf
  }

  public getBalance (): Prisma.Decimal {
    return this.balance
  }

  public setBalance (balance: Prisma.Decimal): void {
    this.balance = balance
  }
}

export default Client
