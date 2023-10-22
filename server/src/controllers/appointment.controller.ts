import { type Request, type Response } from 'express'
import {
  completeAppointmentService,
  createAppointmentService,
  deleteAppoimentService,
  getAppointmentsService,
  modifyAppointmentService
} from '../services/appoiment.service'

export const deleteAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
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
  const { id, clientId } = req.params
  const { body } = req

  const { success, statusCode, msg, appointment, durationInMinutes } =
    await modifyAppointmentService(id, clientId, body)
  res.status(statusCode).json({
    success,
    msg,
    appointment,
    durationInMinutes
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

export const completeAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { success, msg, statusCode } = await completeAppointmentService(id)
  res.status(statusCode).json({
    success,
    msg
  })
}

export const getAppointments = async (
  req: Request,
  res: Response
): Promise<void> => {
  const barberId = req.userInSessionId

  const { success, msg, statusCode, appointments } =
    await getAppointmentsService(barberId)
  res.status(statusCode).json({
    success,
    msg,
    appointments
  })
}
