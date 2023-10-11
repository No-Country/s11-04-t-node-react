import { Router } from 'express'
import { login, verifyEmail } from '../controllers/barber.controller'
import { extractToken } from '../middlewares/extractToken.middleware'

const loginRouter = Router()

loginRouter.post('/login', login)
loginRouter.post('/verify-email', extractToken, verifyEmail)

export { loginRouter }
