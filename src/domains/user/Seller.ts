import type ISeller from '../../interfaces/ISeller'
import User from './User'

class Seller extends User {
  private createdAt: string

  constructor (seller: ISeller) {
    super(seller)
    this.createdAt = seller.createdAt
  }

  public getCreatedAt (): string {
    return this.createdAt
  }

  public setCreatedAt (createdAt: string): void {
    this.createdAt = createdAt
  }
}

export default Seller
