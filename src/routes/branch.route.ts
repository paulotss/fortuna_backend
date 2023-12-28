/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import BranchController from '../controllers/BranchController'
import AuthHandle from '../middlewares/AuthHandle'

const router = Router()

router.get('/branch',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1, 2]),
  (req, res, next) => new BranchController(req, res, next).getAll()
)

export default router
