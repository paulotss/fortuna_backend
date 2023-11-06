import { type Request, type Response, type NextFunction } from 'express'
import LossService from '../services/LossService'

class LossController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: LossService

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new LossService()
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
}

export default LossController
