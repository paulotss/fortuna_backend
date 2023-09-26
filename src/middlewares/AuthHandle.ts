import { type Request, type Response, type NextFunction } from 'express'
import JwtToken from '../utils/JwtToken'

class AuthHandle {
  private readonly accessLevel: number

  constructor (accessLevel: number) {
    this.accessLevel = accessLevel
  }

  public async authVerify (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { authorization } = req.headers
      if (authorization === undefined) throw new Error()
      const jwt = new JwtToken()
      const payload = jwt.getPayload(authorization)
      if (payload.accessLevel !== this.accessLevel) throw new Error()
      res.locals.jwt = payload
      next()
    } catch (error) {
      res.sendStatus(403)
    }
  }
}

export default AuthHandle
