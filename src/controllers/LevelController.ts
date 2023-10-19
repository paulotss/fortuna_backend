import { type Request, type Response, type NextFunction } from 'express'
import LevelService from '../services/LevelService'

class LevelController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: LevelService

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new LevelService()
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

export default LevelController
