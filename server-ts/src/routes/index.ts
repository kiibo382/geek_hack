import Express from 'express'
import usersRoutes from './users'
import authRoutes from './auth'
import groupsRoutes from './groups'

const router: Express.Router = Express.Router()

router.use('/users', usersRoutes)
router.use('/auth', authRoutes)
router.use('/groups', groupsRoutes)

export default router