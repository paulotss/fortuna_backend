/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import CashierController from '../controllers/CashierController'
import AuthHandle from '../middlewares/AuthHandle'

const router = Router()

router.get('/cashier',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1]),
  (req, res, next) => new CashierController(req, res, next).getAll()
)

router.get('/cashier/:id',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1]),
  (req, res, next) => new CashierController(req, res, next).getById()
)

router.post('/cashier',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0]),
  (req, res, next) => new CashierController(req, res, next).createOne()
)

router.put('/cashier',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0]),
  (req, res, next) => new CashierController(req, res, next).updateOne()
)

export default router
