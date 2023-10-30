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
import {
  isAdmin,
  isBarber,
  isBarberOrAdmin
} from '../middlewares/role.middlewares'

export const loginRouter = Router()
export const barberRouter = Router()

loginRouter.post('/login', login)
loginRouter.post('/verify-email', extractToken, verifyEmail)

const applyCommonMiddleware = (router: Router) => {
  router.use(extractToken, auth)
}

applyCommonMiddleware(barberRouter)

barberRouter.post('/create', isAdmin, createBarber)
barberRouter.get('/get-barbers', isAdmin, getBarbers)
barberRouter.delete('/delete/:id', isAdmin, deleteBarber)
barberRouter.get('/get-barber/:id', isAdmin, getBarberById)
barberRouter.put('/modify/:id', isAdmin, modifyBarber)
barberRouter.get('/barbers-with-services', isAdmin, getBarbersWithTheirServices)
barberRouter.put('/modify-me/:id', isBarber, modifyBerberInSession)
barberRouter.get('/get-me/:id', isBarber, getBarberInSession)
barberRouter.get('/get-clients/:id', isBarberOrAdmin, getBarberClients)
