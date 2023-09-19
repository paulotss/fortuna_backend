import type User from '../domains/user/User'
import type IUser from '../interfaces/IUser'

abstract class UserService {
  protected abstract createDomain (user: IUser): User
}

export default UserService
