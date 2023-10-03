import { type Request, type Response, type NextFunction } from 'express'
import InvoiceService from '../services/InvoiceService'
import { type IInvoiceCreateRequest } from '../interfaces'

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
}

export default InvoiceController
