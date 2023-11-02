import { Router } from 'express'
import {
  createBarber,
  deleteBarber,
  getBarberById,
  getBarberClients,
  getBarberInSession,
  getBarbers,
  getBarbersWithTheirServices,
  login,
  modifyBarber,
  modifyBerberInSession,
  verifyEmail
} from '../controllers/barber.controller'
import { auth } from '../middlewares/auth.middleware'
import { extractToken } from '../middlewares/extractToken.middleware'
import { isAdmin, isBarberOrAdmin } from '../middlewares/role.middlewares'

export const loginRouter = Router()
export const barberRouter = Router()

loginRouter.post('/login', login)
loginRouter.post('/verify-email', extractToken, verifyEmail)

barberRouter.post('/create', extractToken, auth, isAdmin, createBarber)
barberRouter.get('/get-barbers', extractToken, auth, isAdmin, getBarbers)
barberRouter.delete('/delete/:id', extractToken, auth, isAdmin, deleteBarber)
barberRouter.get('/get-barber/:id', extractToken, auth, isAdmin, getBarberById)
barberRouter.put('/modify/:id', extractToken, auth, isAdmin, modifyBarber)
barberRouter.get(
  '/barbers-with-services',
  extractToken,
  auth,
  isAdmin,
  getBarbersWithTheirServices
)
barberRouter.put(
  '/modify-me/:id',
  extractToken,
  auth,
  isBarberOrAdmin,
  modifyBerberInSession
)
barberRouter.get(
  '/get-me/:id',
  extractToken,
  auth,
  isBarberOrAdmin,
  getBarberInSession
)
barberRouter.get(
  '/get-clients/:id',
  extractToken,
  auth,
  isBarberOrAdmin,
  getBarberClients
)
