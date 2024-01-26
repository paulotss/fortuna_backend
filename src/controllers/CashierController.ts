import { type Request, type Response, type NextFunction } from 'express'
import CashierService from '../services/CashierService'

class CashierController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: CashierService

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new CashierService()
  }

  public async getAll (): Promise<void> {
    try {
      const result = await this.service.getAll()
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getById (): Promise<void> {
    try {
      const { id } = this.request.params
      const result = await this.service.getById(Number(id))
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
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

  public async updateUniqueInput (): Promise<void> {
    try {
      const request = this.request.body
      const result = await this.service.updateUniqueInput(request)
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }
}

export default CashierController
