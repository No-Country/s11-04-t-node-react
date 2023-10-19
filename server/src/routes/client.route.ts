import { Router } from 'express'
import {
  createClient,
  deleteClient,
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
clientRouter.delete(
  '/delete/:id',
  extractToken,
  auth,
  isBarberOrAdmin,
  deleteClient
)
clientRouter.get('/get-all', extractToken, auth, isBarberOrAdmin, getClients)
clientRouter.post('/create', extractToken, auth, isBarberOrAdmin, createClient)
