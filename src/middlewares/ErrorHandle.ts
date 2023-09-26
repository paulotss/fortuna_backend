/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import type CustomError from '../utils/CustomError'

class ErrorHandle {
  public static handle (
    error: CustomError,
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.status(error.status || 500).json({ message: error.message })
    next()
  }
}

export default ErrorHandle
