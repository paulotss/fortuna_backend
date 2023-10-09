/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import ClientController from '../controllers/ClientController'

const router = Router()

router.get('/client/:id', (req, res, next) =>
  new ClientController(req, res, next).getById()
)

router.get('/clients', (req, res, next) =>
  new ClientController(req, res, next).getAll()
)

export default router
