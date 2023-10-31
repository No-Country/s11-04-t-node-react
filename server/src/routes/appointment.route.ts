import { Router } from 'express'
import {
  cancelPendingAppointment,
  completePendingAppointment,
  createAppointment,
  getAppointments,
  getAppointmentsByDate,
  modifyAppointment
} from '../controllers/appointment.controller'
import { auth } from '../middlewares/auth.middleware'
import { extractToken } from '../middlewares/extractToken.middleware'
import { isBarberOrAdmin } from '../middlewares/role.middlewares'

export const appoimentRouter = Router()

const applyCommonMiddleware = (router: Router) => {
  router.use(extractToken, auth, isBarberOrAdmin)
}

applyCommonMiddleware(appoimentRouter)

appoimentRouter.put('/modify/:id/:clientId', modifyAppointment)
appoimentRouter.post('/create', createAppointment)
appoimentRouter.put('/complete/:id', completePendingAppointment)
appoimentRouter.put('/cancel/:id', cancelPendingAppointment)
appoimentRouter.get('/get-all', getAppointments)
appoimentRouter.get('/appointments-by-date/:date', getAppointmentsByDate)
