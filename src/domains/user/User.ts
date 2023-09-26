import type IUser from '../../interfaces/IUser'

class User {
  private id: number | undefined
  private name: string
  private code: string
  private password: string
  private cellPhone: string
  private email: string
  private branch: string
  private type: string

  constructor (user: IUser) {
    this.id = user.id
    this.name = user.name
    this.code = user.code
    this.password = user.password
    this.cellPhone = user.cellPhone
    this.email = user.email
    this.branch = user.branch
    this.type = user.type
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

  public getCode (): string {
    return this.code
  }

  public setCode (code: string): void {
    this.code = code
  }

  public getPassword (): string {
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

  public getBranch (): string {
    return this.branch
  }

  public setBranch (branch: string): void {
    this.branch = branch
  }

  public getType (): string {
    return this.type
  }

  public setType (type: string): void {
    this.type = type
  }
}

export default User
