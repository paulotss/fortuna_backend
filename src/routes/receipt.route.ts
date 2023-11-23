/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import ReceiptController from '../controllers/ReceiptController'

const router = Router()

router.post('/receipt', (req, res, next) =>
  new ReceiptController(req, res, next).createOne()
)

export default router
