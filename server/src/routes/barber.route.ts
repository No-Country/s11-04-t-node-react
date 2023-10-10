import { Router } from 'express'
import { login } from '../controllers/barber.controller'

const loginRouter = Router()

loginRouter.post('/login', login)

export { loginRouter }
