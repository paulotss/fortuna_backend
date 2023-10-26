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

export default router
