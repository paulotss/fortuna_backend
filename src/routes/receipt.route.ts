/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import ReceiptController from '../controllers/ReceiptController'
import AuthHandle from '../middlewares/AuthHandle'

const router = Router()

router.post('/receipt',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1, 2, 3]),
  (req, res, next) => new ReceiptController(req, res, next).createOne()
)

router.get('/receipt/method/:id',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1]),
  (req, res, next) => new ReceiptController(req, res, next).getByMethod()
)

router.get('/receipt/:id',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1, 2, 3, 4, 5]),
  (req, res, next) => new ReceiptController(req, res, next).getById()
)

router.get('/receipt/client/:clientId',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1, 2, 3, 4, 5]),
  (req, res, next) => new ReceiptController(req, res, next).getByClient()
)

export default router
