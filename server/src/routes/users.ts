import Express from 'express'
import usersController from '../controllers/users'

const router = Express.Router()

router.get('/', usersController.index)

export default router