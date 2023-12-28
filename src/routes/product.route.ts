/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import ProductController from '../controllers/ProductController'
import AuthHandle from '../middlewares/AuthHandle'

const router = Router()

router.get('/products',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1]),
  (req, res, next) => new ProductController(req, res, next).getAll()
)

router.get('/product/:id',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1]),
  (req, res, next) => new ProductController(req, res, next).getOne()
)

router.get('/product/recent/:limit',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1]),
  (req, res, next) => new ProductController(req, res, next).getRecentlySoldProducts()
)

router.get('/products/search',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1]),
  (req, res, next) => new ProductController(req, res, next).getByTitle()
)

router.get('/product/invoice/:id',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0]),
  (req, res, next) => new ProductController(req, res, next).getProductsOfInvoice()
)

router.get('/product/barcode/:code',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1]),
  (req, res, next) => new ProductController(req, res, next).getByBarCode()
)

router.put('/product',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0]),
  (req, res, next) => new ProductController(req, res, next).updateUniqueInput()
)

router.post('/product',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0]),
  (req, res, next) => new ProductController(req, res, next).createOne()
)

export default router
