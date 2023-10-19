import { Router } from 'express'
import {
  createService,
  deleteService,
  getService,
  getServices,
  modifyService
} from '../controllers/services.controller'
import { auth } from '../middlewares/auth.middleware'
import { extractToken } from '../middlewares/extractToken.middleware'
import { isAdmin, isBarberOrAdmin } from '../middlewares/role.middlewares'

export const servicesRouter = Router()

servicesRouter.post('/create', extractToken, auth, isAdmin, createService)
servicesRouter.delete('/delete/:id', extractToken, auth, isAdmin, deleteService)
servicesRouter.get(
  '/get-service/:id',
  extractToken,
  auth,
  isBarberOrAdmin,
  getService
)
servicesRouter.put('/modify/:id', extractToken, auth, isAdmin, modifyService)
servicesRouter.get(
  '/get-services',
  extractToken,
  auth,
  isBarberOrAdmin,
  getServices
)
