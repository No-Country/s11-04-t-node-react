import { Router } from 'express'
import {
  createClient,
  getClientAppointments,
  getClients,
  modifyClient
} from '../controllers/client.controller'
import { auth } from '../middlewares/auth.middleware'
import { extractToken } from '../middlewares/extractToken.middleware'
import { isBarberOrAdmin } from '../middlewares/role.middlewares'

export const clientRouter = Router()

clientRouter.put(
  '/modify/:id',
  extractToken,
  auth,
  isBarberOrAdmin,
  modifyClient
)
clientRouter.get('/get-all', extractToken, auth, isBarberOrAdmin, getClients)
clientRouter.post('/create', extractToken, auth, isBarberOrAdmin, createClient)
clientRouter.get(
  '/get-appointments/:id',
  extractToken,
  auth,
  isBarberOrAdmin,
  getClientAppointments
)
