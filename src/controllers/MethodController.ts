import { type Request, type Response, type NextFunction } from 'express'
import MethodService from '../services/MethodService'

class MethodController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: MethodService

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new MethodService()
  }

  public async getAll (): Promise<void> {
    try {
      const result = await this.service.getAll()
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }
}

export default MethodController
