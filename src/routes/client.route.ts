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

router.get('/clients/search', (req, res, next) =>
  new ClientController(req, res, next).getByName()
)

router.put('/client', (req, res, next) =>
  new ClientController(req, res, next).updateUniqueInput()
)

router.post('/client', (req, res, next) =>
  new ClientController(req, res, next).createOne()
)

export default router
