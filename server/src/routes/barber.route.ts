import { Router } from 'express'
import { login, verifyEmail } from '../controllers/barber.controller'
import { tokenOTP } from '../middlewares/tokenOTP.middleware'

const loginRouter = Router()

loginRouter.post('/login', login)
loginRouter.post('/verify-email', tokenOTP, verifyEmail)

export { loginRouter }
