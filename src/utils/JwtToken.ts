import jwt, { type JwtPayload } from 'jsonwebtoken'
import CustomError from './CustomError'

export interface JwtPayloadType {
  id: number
  accessLevel: number
}

export interface JwtPayloadAdminType {
  id: number
  name: string
  roleId: number
}

export interface JwtPayloadClientType {
  id: number
  name: string
  roleId: number
}

export interface JwtPayloadRoleType {
  id: number
  name: string
  roleId: number
  cashierId: number
  cashierName: string
}

class JwtToken {
  private readonly privateKey: string

  constructor () {
    if (process.env.JWT_TOKEN === undefined) throw new CustomError('Internal error', 500)
    this.privateKey = process.env.JWT_TOKEN
  }

  public generateToken (payload: JwtPayloadType): string {
    return jwt.sign({ payload }, this.privateKey, {
      expiresIn: '1d'
    })
  }

  public generateTokenAdmin (payload: JwtPayloadAdminType): string {
    return jwt.sign({ payload }, this.privateKey, {
      expiresIn: '1d'
    })
  }

  public generateTokenClient (payload: JwtPayloadClientType): string {
    return jwt.sign({ payload }, this.privateKey, {
      expiresIn: '1d'
    })
  }

  public generateTokenRole (payload: JwtPayloadRoleType): string {
    return jwt.sign({ payload }, this.privateKey, {
      expiresIn: '1d'
    })
  }

  public async getPayload (token: string): Promise<JwtPayload> {
    const privateKey = this.privateKey
    const promise: Promise<JwtPayload> =
      new Promise<JwtPayload>(function (resolve, reject) {
        const result = jwt.verify(token, privateKey)
        if (typeof result === 'string' || result === undefined) {
          reject(new Error('not JwtPayload'))
        } else {
          resolve(result)
        }
      })
    return await promise
  }
}

export default JwtToken
