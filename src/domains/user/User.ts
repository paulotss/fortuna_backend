import type IUser from '../../interfaces/IUser'
import type Branch from '../Branch'
import type Level from '../Level'

class User {
  private id: number | undefined
  private name: string
  private code?: string
  private password?: string
  private cellPhone: string
  private email: string
  private branch?: Branch
  private level?: Level

  constructor (user: IUser) {
    this.id = user.id
    this.name = user.name
    this.code = user.code
    this.password = user.password
    this.cellPhone = user.cellPhone
    this.email = user.email
    this.branch = user.branch
    this.level = user.level
  }

  public getId (): number | undefined {
    return this.id
  }

  public setId (id: number | undefined): void {
    this.id = id
  }

  public getName (): string {
    return this.name
  }

  public setName (name: string): void {
    this.name = name
  }

  public getCode (): string | undefined {
    return this.code
  }

  public setCode (code: string): void {
    this.code = code
  }

  public getPassword (): string | undefined {
    return this.password
  }

  public setPassword (password: string): void {
    this.password = password
  }

  public getCellPhone (): string {
    return this.cellPhone
  }

  public setCellPhone (cellPhone: string): void {
    this.cellPhone = cellPhone
  }

  public getEmail (): string {
    return this.email
  }

  public setEmail (email: string): void {
    this.email = email
  }

  public getBranch (): Branch | undefined {
    return this.branch
  }

  public setBranch (branch: Branch): void {
    this.branch = branch
  }

  public getLevel (): Level | undefined {
    return this.level
  }

  public setLevel (level: Level): void {
    this.level = level
  }
}

export default User
