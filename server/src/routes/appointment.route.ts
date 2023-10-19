import { Router } from 'express'
import { deleteAppointment } from '../controllers/appointment.controller'

export const appoimentRouter = Router()

appoimentRouter.delete('/delete/:id', deleteAppointment)
