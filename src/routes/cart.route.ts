/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import CartController from '../controllers/CartController'
import AuthHandle from '../middlewares/AuthHandle'

const router = Router()

router.post('/cart',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1, 2, 3, 4, 5]),
  (req, res, next) => new CartController(req, res, next).createOne()
)

router.put('/cart/status',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1, 2, 3, 4, 5]),
  (req, res, next) => new CartController(req, res, next).finishStatus()
)

router.get('/cart/cashier/:cashierId',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1, 2, 3, 4]),
  (req, res, next) => new CartController(req, res, next).getAllByCashierId()
)

router.get('/cart/client/:clientId',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1, 2, 3, 4, 5]),
  (req, res, next) => new CartController(req, res, next).getAllByClientId()
)

export default router
