import { type Request, type Response, type NextFunction } from 'express'
import SellerService from '../services/SellerService'

class SellerController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: SellerService

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new SellerService()
  }

  public async login (): Promise<void> {
    try {
      const payload = this.request.body
      const token = await this.service.login(payload)
      this.response.status(200).json(token)
    } catch (error) {
      this.next(error)
    }
  }

  public async verify (): Promise<void> {
    try {
      const { token } = this.request.body
      const payload = await this.service.verify(token)
      this.response.status(200).json(payload)
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

  public async getByUserId (): Promise<void> {
    try {
      const { id } = this.request.params
      const result = await this.service.getByUserId(Number(id))
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }
}

export default SellerController
