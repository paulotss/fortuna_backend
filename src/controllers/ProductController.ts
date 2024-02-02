import { type Request, type Response, type NextFunction } from 'express'
import ProductService from '../services/ProductService'
import CustomError from '../utils/CustomError'
import { IProductCreateRequest } from '../interfaces'

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
      const { title } = this.request.query
      const result = await this.service.getAll(title?.toString())
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getByCashierId (): Promise<void> {
    try {
      const { cashierId } = this.request.params
      const { title } = this.request.query
      const result = await this.service.getByCashierId(Number(cashierId), title?.toString())
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

  public async setAmount (): Promise<void> {
    try {
      const request = this.request.body
      const result = await this.service.setAmount(request)
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

  public async getByTitleAndCashierId (): Promise<void> {
    try {
      const { cashierId } = this.request.params
      const { title } = this.request.query
      if (typeof title !== 'string') throw new CustomError('Not found', 404)
      const result = await this.service.getByTitleAndCashierId(title, Number(cashierId))
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getRecentlySoldProducts (): Promise<void> {
    try {
      const { limit, cashierId } = this.request.params
      const result = await this.service.getRecentlySoldProducts(Number(limit), Number(cashierId))
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
      const { title, description, price, barCode, supplierId} = this.request.body
      const request: IProductCreateRequest = {
        title,
        description,
        price,
        barCode,
        supplierId: Number(supplierId),
      }
      const result = await this.service.createOne(request)
      this.response.status(201).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getProductsOfInvoice (): Promise<void> {
    try {
      const { id } = this.request.params
      const result = await this.service.getProductsOfInvoice(Number(id))
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getByBarCode (): Promise<void> {
    try {
      const { code, cashierId } = this.request.params
      const result = await this.service.getByBarCode(code, Number(cashierId))
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }
}

export default ProductController
