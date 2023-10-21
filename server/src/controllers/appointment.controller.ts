import { type Request, type Response } from 'express'
import {
  createAppointmentService,
  deleteAppoimentService,
  modifyAppointmentService
} from '../services/appoiment.service'

export const deleteAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.body
  const { success, statusCode, msg } = await deleteAppoimentService(id)
  res.status(statusCode).json({
    success,
    msg
  })
}

export const modifyAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.body
  const { body } = req

  const { success, statusCode, msg } = await modifyAppointmentService(id, body)
  res.status(statusCode).json({
    success,
    msg
  })
}

export const createAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { body } = req
  const { success, statusCode, msg, appointment, durationInMinutes } =
    await createAppointmentService(body)
  res.status(statusCode).json({
    success,
    msg,
    appointment,
    durationInMinutes
  })
}
