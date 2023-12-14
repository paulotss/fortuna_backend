import { type Request, type Response, type NextFunction } from 'express'
import ClientService from '../services/ClientService'
import { type IClientInvoicesRequest, type IClientCreateRequest } from '../interfaces'
import CustomError from '../utils/CustomError'

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
      const clientRequest: IClientCreateRequest = this.request.body
      const result = await this.service.createOne(clientRequest)
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getById (): Promise<void> {
    try {
      const { id } = this.request.params
      const client = await this.service.getById(Number(id))
      this.response.status(200).json(client)
    } catch (error) {
      this.next(error)
    }
  }

  public async getAll (): Promise<void> {
    try {
      const clients = await this.service.getAll()
      this.response.status(200).json(clients)
    } catch (error) {
      this.next(error)
    }
  }

  public async getByName (): Promise<void> {
    try {
      const { name } = this.request.query
      if (name === undefined || typeof name !== 'string') throw new CustomError('Not found', 404)
      const result = await this.service.getByName(name)
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getByCpf (): Promise<void> {
    try {
      const { cpf } = this.request.params
      const result = await this.service.getByCpf(cpf)
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getByIdWithInvoices (): Promise<void> {
    try {
      const { id } = this.request.params
      const { startDate, endDate, limit } = this.request.query
      const request: IClientInvoicesRequest = {
        clientId: Number(id),
        startDate: typeof startDate === 'string' ? new Date(startDate.toString()) : new Date(),
        endDate: typeof endDate === 'string' ? new Date(endDate.toString()) : new Date(),
        limit: typeof limit === 'string' ? Number(limit) : undefined
      }
      const result = await this.service.getByIdWithInvoices(request)
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async updateUniqueInput (): Promise<void> {
    try {
      const request = this.request.body
      const result = await this.service.updateUniqueInput(request)
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }
}

export default ClientController
