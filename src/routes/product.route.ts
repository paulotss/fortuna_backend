/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import ProductController from '../controllers/ProductController'

const router = Router()

router.get('/products', (req, res, next) =>
  new ProductController(req, res, next).getAll()
)

router.get('/product/:id', (req, res, next) =>
  new ProductController(req, res, next).getOne()
)

router.get('/product/recent/:limit', (req, res, next) =>
  new ProductController(req, res, next).getRecentlySoldProducts()
)

router.get('/products/search', (req, res, next) =>
  new ProductController(req, res, next).getByTitle()
)

router.get('/product/invoice/:id', (req, res, next) =>
  new ProductController(req, res, next).getProductsOfInvoice()
)

router.put('/product', (req, res, next) =>
  new ProductController(req, res, next).updateUniqueInput()
)

router.post('/product', (req, res, next) =>
  new ProductController(req, res, next).createOne()
)

export default router
