import type Branch from '../domains/Branch'
import type Level from '../domains/Level'

interface IUser {
  id: number | undefined
  name: string
  code?: string
  password?: string
  cellPhone: string
  email: string
  branch?: Branch
  level?: Level
}

export default IUser
