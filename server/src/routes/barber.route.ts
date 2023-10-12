import { Router } from 'express'
import {
  createBarber,
  login,
  verifyEmail
} from '../controllers/barber.controller'
import { auth } from '../middlewares/auth.middleware'
import { extractToken } from '../middlewares/extractToken.middleware'
import { isAdmin } from '../middlewares/role.middlewares'

export const loginRouter = Router()
export const barberRouter = Router()

loginRouter.post('/login', login)
loginRouter.post('/verify-email', extractToken, verifyEmail)

barberRouter.post('/create', extractToken, auth, isAdmin, createBarber)
