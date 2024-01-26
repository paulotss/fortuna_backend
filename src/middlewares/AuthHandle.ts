import { type Request, type Response, type NextFunction } from 'express'
import JwtToken from '../utils/JwtToken'
import { type JwtPayload } from 'jsonwebtoken'

class AuthHandle {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction

  constructor (req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
  }

  private async getPayload (): Promise<JwtPayload> {
    const { authorization } = this.request.headers
    if (authorization === undefined) throw new Error()
    const jwt = new JwtToken()
    const {payload} = await jwt.getPayload(authorization)
    return payload
  }

  public async authVerifyAcessLevel (accessLevel: number[]): Promise<Response | null> {
    try {
      const payload = await this.getPayload()
      if (!accessLevel.some((a) => a === payload.roleId)) throw new Error()
      this.response.locals.jwt = payload
      this.next()
      return null
    } catch (error) {
      const payload = await this.getPayload()
      return this.response.status(403).json(payload)
    }
  }

  public async authVerifyClient (id: number): Promise<Response | null> {
    try {
      const payload = await this.getPayload()
      if (id !== payload.id) throw new Error()
      this.next()
      return null
    } catch (error) {
      return this.response.sendStatus(403)
    }
  }
}

export default AuthHandle
