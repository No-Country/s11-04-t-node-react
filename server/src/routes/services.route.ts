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

const applyCommonMiddleware = (router: Router) => {
  router.use(extractToken, auth)
}

applyCommonMiddleware(servicesRouter)

servicesRouter.post('/create', isAdmin, createService)
servicesRouter.delete('/delete/:id', isAdmin, deleteService)
servicesRouter.get('/get-service/:id', isBarberOrAdmin, getService)
servicesRouter.put('/modify/:id', isAdmin, modifyService)
servicesRouter.get('/get-services', isBarberOrAdmin, getServices)
