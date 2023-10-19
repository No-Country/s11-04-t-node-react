import { Router } from 'express'
import {
  deleteAppointment,
  modifyAppointment
} from '../controllers/appointment.controller'

export const appoimentRouter = Router()

appoimentRouter.delete('/delete/:id', deleteAppointment)
appoimentRouter.put('/modify/:id', modifyAppointment)
