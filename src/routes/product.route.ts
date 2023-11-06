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

router.put('/product', (req, res, next) =>
  new ProductController(req, res, next).updateUniqueInput()
)

router.post('/product', (req, res, next) =>
  new ProductController(req, res, next).createOne()
)

export default router
