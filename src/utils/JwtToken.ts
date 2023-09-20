import jwt, { type JwtPayload } from 'jsonwebtoken'
import CustomError from './CustomError'

export interface JwtPayloadType {
  code: string
  accessLevel: number
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

  public getPayload (token: string): JwtPayload {
    const result = jwt.verify(token, this.privateKey)
    if (typeof result === 'string') throw new Error()
    return result
  }
}

export default JwtToken
