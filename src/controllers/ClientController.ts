/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response, type NextFunction } from 'express'
import ClientService from '../services/ClientService'

class ClientController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: ClientService

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new ClientService()
  }

  public async getById () {
    try {
      const { id } = this.request.params
      const client = await this.service.getById(Number(id))
      this.response.status(200).json(client)
    } catch (error) {
      this.next(error)
    }
  }
}

export default ClientController