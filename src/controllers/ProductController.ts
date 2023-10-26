import { type Request, type Response, type NextFunction } from 'express'
import ProductService from '../services/ProductService'

class ProductController {
  private readonly request: Request
  private readonly reponse: Response
  private readonly next: NextFunction
  private readonly service: ProductService

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.reponse = res
    this.next = next
    this.service = new ProductService()
  }

  public async getAll (): Promise<void> {
    try {
      const result = await this.service.getAll()
      this.reponse.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getOne (): Promise<void> {
    try {
      const { id } = this.request.params
      const result = await this.service.getOne(Number(id))
      this.reponse.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }
}

export default ProductController
