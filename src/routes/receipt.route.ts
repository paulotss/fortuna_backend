/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import ReceiptController from '../controllers/ReceiptController'
import AuthHandle from '../middlewares/AuthHandle'

const router = Router()

router.post('/receipt',
  (req, res, next) => new AuthHandle([0]).authVerify(req, res, next),
  (req, res, next) => new ReceiptController(req, res, next).createOne()
)

router.get('/receipt/:id',
  (req, res, next) => new ReceiptController(req, res, next).getByMethod()
)

export default router
