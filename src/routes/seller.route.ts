/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import SellerController from '../controllers/SellerController'

const router = Router()

router.post('/seller/login', (req, res, next) =>
  new SellerController(req, res, next).login()
)

router.post('/seller/verify', (req, res, next) =>
  new SellerController(req, res, next).verify()
)

router.get('/seller/:id', (req, res, next) =>
  new SellerController(req, res, next).createOne()
)

export default router
