/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import CashierController from '../controllers/CashierController'

const router = Router()

router.get('/cashier', (req, res, next) =>
  new CashierController(req, res, next).getAll()
)

router.get('/cashier/:id', (req, res, next) =>
  new CashierController(req, res, next).getById()
)

router.post('/cashier', (req, res, next) =>
  new CashierController(req, res, next).createOne()
)

router.put('/cashier', (req, res, next) =>
  new CashierController(req, res, next).updateOne()
)

export default router
