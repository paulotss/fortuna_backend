import { type Request, type Response, type NextFunction } from 'express'
import BranchService from '../services/BranchService'

class BranchController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: BranchService

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new BranchService()
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

export default BranchController
