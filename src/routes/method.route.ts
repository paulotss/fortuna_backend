/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import MethodController from '../controllers/MethodController'
import AuthHandle from '../middlewares/AuthHandle'

const router = Router()

router.get('/method',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1, 2, 3]),
  (req, res, next) => new MethodController(req, res, next).getAll()
)

export default router
