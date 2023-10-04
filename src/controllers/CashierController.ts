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

  public async getById (): Promise<void> {
    try {
      const { id } = this.request.params
      const result = await this.service.getById(Number(id))
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }
}

export default CashierController
