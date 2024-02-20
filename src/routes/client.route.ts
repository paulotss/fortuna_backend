/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import ClientController from '../controllers/ClientController'
import AuthHandle from '../middlewares/AuthHandle'

const router = Router()

router.post('/client/login', (req, res, next) =>
  new ClientController(req, res, next).login()
)

router.post('/client/verify', (req, res, next) =>
  new ClientController(req, res, next).verify()
)

router.get('/client/:id',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1, 2, 3, 4, 5]),
  (req, res, next) => new AuthHandle(req, res, next).authVerifyClient(Number(req.params.id)),
  (req, res, next) => new ClientController(req, res, next).getById()
)

router.put('/client/passchange',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1, 2, 3, 4, 5]),
  (req, res, next) => new AuthHandle(req, res, next).authVerifyClient(Number(req.body.clientId)),
  (req, res, next) => new ClientController(req, res, next).changePass()
)

router.get('/clients',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1, 2, 3]),
  (req, res, next) => new ClientController(req, res, next).getAll()
)

router.get('/clients/search',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1, 2, 3, 4]),
  (req, res, next) => new ClientController(req, res, next).getByName()
)

router.get('/client/invoice/:id',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1]),
  (req, res, next) => new ClientController(req, res, next).getByIdWithInvoices()
)

router.get('/client/search/id/:id',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1, 2, 3, 4]),
  (req, res, next) => new ClientController(req, res, next).getById()
)

router.put('/client',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0, 1, 2, 3]),
  (req, res, next) => new ClientController(req, res, next).updateUniqueInput()
)

router.post('/client',
  (req, res, next) => new ClientController(req, res, next).createOne()
)

export default router
