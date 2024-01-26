import { Router } from 'express';
import RoleController from '../controllers/RoleController';
import AuthHandle from '../middlewares/AuthHandle'

const router = Router()

router.get('/role', (req, res, next) =>
  new RoleController(req, res, next).getAll()
)

router.get('/role/user/:userId',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0]),
  (req, res, next) => new RoleController(req, res, next).getRoleByUserId()
)

router.post('/role/user',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0]),
  (req, res, next) => new RoleController(req, res, next).addRoleToUser()
)

router.delete('/role/user',
  (req, res, next) => new AuthHandle(req, res, next).authVerifyAcessLevel([0]),
  (req, res, next) => new RoleController(req, res, next).removeRoleToUser()
)

export default router
