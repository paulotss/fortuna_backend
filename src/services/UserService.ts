import type User from '../domains/user/User'
import type IUser from '../interfaces/IUser'
import { type JwtPayload } from 'jsonwebtoken'
import JwtToken from '../utils/JwtToken'

abstract class UserService {
  protected abstract createDomain (user: IUser): User

  protected generatePass (): string {
    const pass = Math.floor((Math.random() * 999999) + 100000)
    return pass.toString().substring(0, 6)
  }

  public async verify (token: string): Promise<JwtPayload> {
    const jwt = new JwtToken()
    const result = await jwt.getPayload(token)
    return result
  }
}

export default UserService
