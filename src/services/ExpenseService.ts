import { type PrismaClient } from '@prisma/client'
import Expense from '../domains/Expense'
import type IExpense from '../interfaces/IExpense'
import prisma from '../utils/prisma'
import { type IExpenseCreateRequest } from '../interfaces'

class ExpenseService {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }

  private createDomain (expense: IExpense): Expense {
    return new Expense(expense)
  }

  public async createOne (request: IExpenseCreateRequest): Promise<Expense> {
    const expenseModel = await this.prisma.expense.create({ data: request })
    const expense = this.createDomain({
      id: expenseModel.id,
      amount: expenseModel.amount,
      value: expenseModel.value,
      launchDate: expenseModel.launchDate
    })
    return expense
  }
}

export default ExpenseService
