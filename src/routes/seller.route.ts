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

router.post('/seller', (req, res, next) =>
  new SellerController(req, res, next).createOne()
)

router.get('/seller/:id', (req, res, next) =>
  new SellerController(req, res, next).getByUserId()
)

export default router
