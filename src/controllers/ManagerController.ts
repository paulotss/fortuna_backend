import { type Request, type Response, type NextFunction } from 'express'
import ManagerServive from '../services/ManagerService'

class ManagerController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: ManagerServive

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new ManagerServive()
  }

  public async getByUserId (): Promise<void> {
    try {
      const { id } = this.request.params
      const result = await this.service.getByUserId(Number(id))
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async createOne (): Promise<void> {
    try {
      const { userId } = this.request.body
      const result = await this.service.createOne(Number(userId))
      this.response.status(201).json(result)
    } catch (error) {
      this.next(error)
    }
  }
}

export default ManagerController
