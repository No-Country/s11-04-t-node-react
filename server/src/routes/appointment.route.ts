import { Router } from 'express'
import {
  deleteAppointment,
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
  '/modify/:id',
  extractToken,
  auth,
  isBarberOrAdmin,
  modifyAppointment
)
