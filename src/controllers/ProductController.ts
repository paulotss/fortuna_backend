import { type Request, type Response, type NextFunction } from 'express'
import ProductService from '../services/ProductService'
import CustomError from '../utils/CustomError'

class ProductController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: ProductService

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new ProductService()
  }

  public async getAll (): Promise<void> {
    try {
      const result = await this.service.getAll()
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getOne (): Promise<void> {
    try {
      const { id } = this.request.params
      const result = await this.service.getOne(Number(id))
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getByTitle (): Promise<void> {
    try {
      const { title } = this.request.query
      if (typeof title !== 'string') throw new CustomError('Not found', 404)
      const result = await this.service.getByTitle(title)
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getRecentlySoldProducts (): Promise<void> {
    try {
      const { limit } = this.request.params
      const result = await this.service.getRecentlySoldProducts(Number(limit))
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

  public async createOne (): Promise<void> {
    try {
      const request = this.request.body
      const result = await this.service.createOne(request)
      this.response.status(201).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getProductWithInvoices (): Promise<void> {
    try {
      const { id } = this.request.params
      const { startDate, endDate } = this.request.query
      const request = {
        productId: Number(id),
        startDate: typeof startDate === 'string' ? new Date(startDate.toString()) : new Date(),
        endDate: typeof endDate === 'string' ? new Date(endDate.toString()) : new Date()
      }
      const result = await this.service.getProductWithInvoices(request)
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }
}

export default ProductController
