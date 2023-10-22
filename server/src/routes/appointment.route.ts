import { Router } from 'express'
import {
  completeAppointment,
  createAppointment,
  deleteAppointment,
  getAppointments,
  modifyAppointment
} from '../controllers/appointment.controller'
import { auth } from '../middlewares/auth.middleware'
import { extractToken } from '../middlewares/extractToken.middleware'
import { isBarberOrAdmin } from '../middlewares/role.middlewares'

export const appoimentRouter = Router()

appoimentRouter.delete(
  '/delete/:id',
  extractToken,
  auth,
  isBarberOrAdmin,
  deleteAppointment
)
appoimentRouter.put(
  '/modify/:id/:clientId',
  extractToken,
  auth,
  isBarberOrAdmin,
  modifyAppointment
)
appoimentRouter.post(
  '/create',
  extractToken,
  auth,
  isBarberOrAdmin,
  createAppointment
)
appoimentRouter.put(
  '/complete/:id',
  extractToken,
  auth,
  isBarberOrAdmin,
  completeAppointment
)
appoimentRouter.get(
  '/get-all',
  extractToken,
  auth,
  isBarberOrAdmin,
  getAppointments
)
