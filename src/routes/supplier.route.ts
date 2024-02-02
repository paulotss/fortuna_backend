import { Router } from 'express'
import SupplierController from '../controllers/SupplierController'

const router = Router()

router.get('/supplier', (req, res, next) =>
  new SupplierController(req, res, next).getAll()
)

export default router
