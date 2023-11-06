/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import LossController from '../controllers/LossController'

const router = Router()

router.post('/loss', (req, res, next) =>
  new LossController(req, res, next).createOne()
)

export default router
