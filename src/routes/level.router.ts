/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import LevelController from '../controllers/LevelController'
import AuthHandle from '../middlewares/AuthHandle'

const router = Router()

router.get('/level',
  (req, res, next) => new LevelController(req, res, next).getAll()
)

export default router
