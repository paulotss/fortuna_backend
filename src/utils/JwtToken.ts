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
