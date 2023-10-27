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

const applyCommonMiddleware = (router: Router) => {
  router.use(extractToken, auth, isBarberOrAdmin)
}

applyCommonMiddleware(clientRouter)

clientRouter.put('/modify/:id', modifyClient)
clientRouter.get('/get-all', getClients)
clientRouter.post('/create', createClient)
clientRouter.get('/get-appointments/:id', getClientAppointments)
