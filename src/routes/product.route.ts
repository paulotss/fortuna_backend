/* eslint-disable @typescript-eslint/no-floating-promises */
import { Router } from 'express'
import ProductController from '../controllers/ProductController'

const router = Router()

router.get('/products', (req, res, next) => {
  new ProductController(req, res, next).getAll()
})

export default router
