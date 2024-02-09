import { type Request, type Response, type NextFunction } from 'express'
import CartService from '../services/CartService'

class CartController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: CartService

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new CartService()
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

  public async getAllByCashierId (): Promise<void> {
    try {
      const { cashierId } = this.request.params
      const result = await this.service.getAllByCashierId(Number(cashierId))
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getAllByClientId (): Promise<void> {
    try {
      const { clientId } = this.request.params
      const result = await this.service.getAllByClientId(Number(clientId))
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async finishStatus (): Promise<void> {
    try {
      const { cartId } = this.request.body
      console.log(this.request.body)
      const result = await this.service.finishStatus(Number(cartId))
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }
}

export default CartController
