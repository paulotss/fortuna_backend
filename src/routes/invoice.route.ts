/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import InvoiceController from '../controllers/InvoiceController'
import AuthHandle from '../middlewares/AuthHandle'

const router = Router()

router.post('/invoice',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1]),
  (req, res, next) => new InvoiceController(req, res, next).createOne()
)

router.get('/invoice/cashier/:cashierId',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1]),
  (req, res, next) => new InvoiceController(req, res, next).getByCashier()
)

router.get('/invoice/:id',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1]),
  (req, res, next) => new InvoiceController(req, res, next).getById()
)

router.get('/invoice/client/:id',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1]),
  (req, res, next) => new InvoiceController(req, res, next).getByClientId()
)

router.get('/invoice/product/:id',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0]),
  (req, res, next) => new InvoiceController(req, res, next).getInvoicesOfProduct()
)

export default router
