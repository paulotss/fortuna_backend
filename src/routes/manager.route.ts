/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import ManagerController from '../controllers/ManagerController'

const router = Router()

router.get('/manager/:id', (req, res, next) =>
  new ManagerController(req, res, next).getByUserId()
)

router.post('/manager', (req, res, next) =>
  new ManagerController(req, res, next).createOne()
)

export default router
