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
  completePendingAppointment
)
appoimentRouter.put(
  '/cancel/:id',
  extractToken,
  auth,
  isBarberOrAdmin,
  cancelPendingAppointment
)
appoimentRouter.get(
  '/get-all',
  extractToken,
  auth,
  isBarberOrAdmin,
  getAppointments
)
appoimentRouter.get(
  '/appointments-by-date/:date',
  extractToken,
  auth,
  isBarberOrAdmin,
  getAppointmentsByDate
)
