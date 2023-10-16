import type ISeller from '../../interfaces/ISeller'
import User from './User'

class Seller extends User {
  private createdAt: Date

  constructor (seller: ISeller) {
    super(seller)
    this.createdAt = seller.createdAt
  }

  public getCreatedAt (): Date {
    return this.createdAt
  }

  public setCreatedAt (createdAt: Date): void {
    this.createdAt = createdAt
  }
}

export default Seller
