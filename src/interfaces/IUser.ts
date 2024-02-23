import type Branch from '../domains/Branch'
import type Level from '../domains/Level'
import type Role from '../domains/Role'

interface IUser {
  id: number | undefined
  name: string
  password?: string
  cellPhone: string
  email: string
  photo?: string | null
  branch?: Branch
  level?: Level
  role?: Role
  admin: boolean
}

export default IUser
