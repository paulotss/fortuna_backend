/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import MethodController from '../controllers/MethodController'

const router = Router()

router.get('/method', (req, res, next) =>
  new MethodController(req, res, next).getAll()
)

export default router
