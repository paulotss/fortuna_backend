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
    const payload = await jwt.getPayload(authorization)
    return payload
  }

  public async authVerifyAcessLevel (accessLevel: number[]): Promise<Response | null> {
    try {
      const payload = await this.getPayload()
      if (accessLevel.some((a) => a === payload.accessLevel)) throw new Error()
      this.next()
      return null
    } catch (error) {
      return this.response.sendStatus(403)
    }
  }

  public async authVerifyClient (userId: number): Promise<Response | null> {
    try {
      const payload = await this.getPayload()
      if (userId !== payload.id) throw new Error()
      this.next()
      return null
    } catch (error) {
      return this.response.sendStatus(403)
    }
  }

  // public async authVerify (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response | null> {
  //   try {
  //     const { authorization } = req.headers
  //     if (authorization === undefined) throw new Error()
  //     const jwt = new JwtToken()
  //     const payload = await jwt.getPayload(authorization)
  //     if (this.accessLevel.some((a) => a === payload.accessLevel)) throw new Error()
  //     res.locals.jwt = payload
  //     next()
  //     return null
  //   } catch (error) {
  //     return res.sendStatus(403)
  //   }
  // }
}

export default AuthHandle
