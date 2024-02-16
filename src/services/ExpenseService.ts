import { type PrismaClient } from '@prisma/client'
import Expense from '../domains/Expense'
import type IExpense from '../interfaces/IExpense'
import prisma from '../utils/prisma'
import { type IExpenseLaunchDateRequest, type IExpenseCreateRequest } from '../interfaces'
import Product from '../domains/Product'
import convertDateToUTC from '../utils/convertDateToUTC'

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

  public async getByLaunchDate (request: IExpenseLaunchDateRequest): Promise<Expense[]> {
    const expensesModel = await this.prisma.expense.findMany({
      where: { launchDate: {
        gte: convertDateToUTC(new Date(request.startDate)),
        lte: convertDateToUTC(new Date(request.endDate))
      }},
      include: { product: true }
    })
    const expenses = expensesModel.map((expense) => (
      this.createDomain({
        id: expense.id,
        amount: expense.amount,
        value: expense.value,
        launchDate: expense.launchDate,
        product: new Product(expense.product)
      })
    ))
    return expenses
  }
}

export default ExpenseService
