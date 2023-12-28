/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import ManagerController from '../controllers/ManagerController'
import AuthHandle from '../middlewares/AuthHandle'

const router = Router()

router.get('/manager/:id',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0]),
  (req, res, next) => new ManagerController(req, res, next).getByUserId()
)

router.post('/manager',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0]),
  (req, res, next) => new ManagerController(req, res, next).createOne()
)

router.post('/manager/login', (req, res, next) =>
  new ManagerController(req, res, next).login()
)

router.post('/manager/verify', (req, res, next) =>
  new ManagerController(req, res, next).verify()
)

export default router
