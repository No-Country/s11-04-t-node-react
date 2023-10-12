import { Router } from 'express'
import {
  createService,
  deleteService,
  getService
} from '../controllers/services.controller'
import { auth } from '../middlewares/auth.middleware'
import { extractToken } from '../middlewares/extractToken.middleware'
import { isAdmin } from '../middlewares/role.middlewares'

export const servicesRouter = Router()

servicesRouter.post('/create', extractToken, auth, isAdmin, createService)
servicesRouter.delete('/delete/:id', extractToken, auth, isAdmin, deleteService)
servicesRouter.get('/:id', extractToken, auth, isAdmin, getService)
