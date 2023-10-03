/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import InvoiceController from '../controllers/InvoiceController'

const router = Router()

router.post('/invoice', (req, res, next) =>
  new InvoiceController(req, res, next).createOne()
)

export default router
