/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import CashierController from '../controllers/CashierController'

const router = Router()

router.get('/cashier/:id', (req, res, next) =>
  new CashierController(req, res, next).getById()
)

export default router
