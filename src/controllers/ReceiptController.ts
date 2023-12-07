import { type Request, type Response, type NextFunction } from 'express'
import ReceiptService from '../services/ReceiptService'

class ReceiptController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: ReceiptService

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new ReceiptService()
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

  public async getByMethod (): Promise<void> {
    try {
      const { id } = this.request.params
      const { startDate, endDate } = this.request.query
      const request = {
        methodId: Number(id),
        startDate: typeof startDate === 'string' ? new Date(startDate.toString()) : new Date(),
        endDate: typeof endDate === 'string' ? new Date(endDate.toString()) : new Date()
      }
      const result = await this.service.getByMethod(request)
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }
}

export default ReceiptController
