import { type Request, type Response, type NextFunction } from 'express'
import UserService from '../services/UserService'
import { type RequestLoginRoleType } from '../interfaces'
import CustomError from '../utils/CustomError'

class UserController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: UserService

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new UserService()
  }

  public async loginRole (): Promise<void> {
    try {
      const payload = this.request.body
      const token = await this.service.loginRole(payload)
      this.response.status(200).json(token)
    } catch (error) {
      this.next(error)
    }
  }

  public async loginAdmin (): Promise<void> {
    try {
      const payload = this.request.body
      const token = await this.service.loginAdmin(payload)
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
}

export default UserController

