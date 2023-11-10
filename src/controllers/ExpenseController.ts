import { type Request, type Response, type NextFunction } from 'express'
import ExpenseService from '../services/ExpenseService'
import { type IExpenseLaunchDateRequest } from '../interfaces'

class ExpenseController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: ExpenseService

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new ExpenseService()
  }

  public async createOne (): Promise<void> {
    try {
      const request = this.request.body
      const result = await this.service.createOne(request)
      this.response.status(201).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getByLaunchDate (): Promise<void> {
    try {
      const { startDate, endDate } = this.request.query
      const expenseRequest: IExpenseLaunchDateRequest = {
        startDate: typeof startDate === 'string' ? new Date(startDate.toString()) : new Date(),
        endDate: typeof endDate === 'string' ? new Date(endDate.toString()) : new Date()
      }
      const result = await this.service.getByLaunchDate(expenseRequest)
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }
}

export default ExpenseController
