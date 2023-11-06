/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import ExpenseController from '../controllers/ExpenseController'

const router = Router()

router.post('/expense', (req, res, next) =>
  new ExpenseController(req, res, next).createOne()
)

export default router
