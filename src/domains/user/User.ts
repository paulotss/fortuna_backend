import type IUser from '../../interfaces/IUser'
import type Branch from '../Branch'
import type Level from '../Level'
import Role from '../Role'

class User {
  private id: number | undefined
  private name: string
  private password?: string
  private cellPhone: string
  private email: string
  private photo?: string | null
  private branch?: Branch
  private level?: Level
  private role?: Role
  private admin: boolean

  constructor (user: IUser) {
    this.id = user.id
    this.name = user.name
    this.password = user.password
    this.cellPhone = user.cellPhone
    this.email = user.email
    this.photo = user.photo
    this.branch = user.branch
    this.level = user.level
    this.role = user.role
    this.admin = user.admin
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

  public getPhoto (): string | undefined | null {
    return this.photo
  }

  public setPhoto (photo: string | undefined | null): void {
    this.photo = photo
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

  public getRole (): Role | undefined {
    return this.role
  }

  public setRole (role: Role): void {
    this.role = role
  }

  public getAdmin (): boolean {
    return this.admin
  }

  public setAdmin (admin: boolean): void {
    this.admin = admin
  }
}

export default User
