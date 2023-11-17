import type IManager from '../../interfaces/IManager'
import User from './User'

class Manager extends User {
  private createdAt: Date

  constructor (manager: IManager) {
    super(manager)
    this.createdAt = manager.createdAt
  }

  public getCreatedAt (): Date {
    return this.createdAt
  }

  public setCreatedAt (createdAt: Date): void {
    this.createdAt = createdAt
  }
}

export default Manager
