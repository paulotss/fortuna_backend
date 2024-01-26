import type IRole from '../interfaces/IRole'
import User from './user/User'

class Role {
  private id: number | undefined
  private title: string
  private users: User[] | undefined

  constructor (role: IRole) {
    this.id = role.id
    this.title = role.title
    this.users = role.users
  }

  public getId (): number | undefined {
    return this.id
  }

  public setId (id: number): void {
    this.id = id
  }

  public getTitle (): string {
    return this.title
  }

  public setTitle (title: string): void {
    this.title = title
  }

  public getUsers (): User[] | undefined {
    return this.users
  }

  public setUsers (users: User[]): void {
    this.users = users
  }
}

export default Role
