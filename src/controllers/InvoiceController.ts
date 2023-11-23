import { type Request, type Response, type NextFunction } from 'express'
import InvoiceService from '../services/InvoiceService'
import { type IClientInvoicesRequest, type IInvoiceCreateRequest, type IInvoiceReportCashierRequest } from '../interfaces'

class InvoiceController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: InvoiceService

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new InvoiceService()
  }

  public async createOne (): Promise<void> {
    try {
      const invoiceRequest: IInvoiceCreateRequest = this.request.body
      const result = await this.service.createOne(invoiceRequest)
      this.response.status(201).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getByCashier (): Promise<void> {
    try {
      const { cashierId } = this.request.params
      const { startDate, endDate } = this.request.query
      const invoiceRequest: IInvoiceReportCashierRequest = {
        cashierId: Number(cashierId),
        startDate: typeof startDate === 'string' ? new Date(startDate.toString()) : new Date(),
        endDate: typeof endDate === 'string' ? new Date(endDate.toString()) : new Date()
      }
      const result = await this.service.getByCashier(invoiceRequest)
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getByClientId (): Promise<void> {
    try {
      const { id } = this.request.params
      const { startDate, endDate, limit } = this.request.query
      const invoiceRequest: IClientInvoicesRequest = {
        clientId: Number(id),
        startDate: typeof startDate === 'string' ? new Date(startDate.toString()) : new Date(),
        endDate: typeof endDate === 'string' ? new Date(endDate.toString()) : new Date(),
        limit: typeof limit === 'string' ? Number(limit) : undefined
      }
      const result = await this.service.getByClientId(invoiceRequest)
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getById (): Promise<void> {
    try {
      const { id } = this.request.params
      const result = await this.service.getById(Number(id))
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }
}

export default InvoiceController
