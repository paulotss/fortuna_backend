/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import UserController from '../controllers/UserController'
//import AuthHandle from '../middlewares/AuthHandle'

const router = Router()

router.post('/role/login', (req, res, next) =>
  new UserController(req, res, next).loginRole()
)

router.post('/admin/login', (req, res, next) =>
  new UserController(req, res, next).loginAdmin()
)

router.post('/user/verify', (req, res, next) =>
  new UserController(req, res, next).verify()
)

export default router
