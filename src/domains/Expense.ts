import { type Decimal } from '@prisma/client/runtime/library'
import type IExpense from '../interfaces/IExpense'

class Expense {
  private id: number | undefined
  private amount: number
  private value: Decimal
  private launchDate: Date

  constructor (expense: IExpense) {
    this.id = expense.id
    this.amount = expense.amount
    this.value = expense.value
    this.launchDate = expense.launchDate
  }

  public getId (): number | undefined {
    return this.id
  }

  public setId (id: number): void {
    this.id = id
  }

  public getAmount (): number {
    return this.amount
  }

  public setAmount (amount: number): void {
    this.amount = amount
  }

  public getValue (): Decimal {
    return this.value
  }

  public setValue (value: Decimal): void {
    this.value = value
  }

  public getLaunchDate (): Date {
    return this.launchDate
  }

  public setLaunchDate (launchDate: Date): void {
    this.launchDate = launchDate
  }
}

export default Expense
