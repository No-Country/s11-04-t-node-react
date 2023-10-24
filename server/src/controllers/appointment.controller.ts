import { type Request, type Response } from 'express'
import {
  cancelAppointmentService,
  completeAppointmentService,
  createAppointmentService,
  getAppointmentsService,
  modifyAppointmentService
} from '../services/appoiment.service'

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

export const cancelAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { success, msg, statusCode } = await cancelAppointmentService(id)

  res.status(statusCode).json({
    success,
    msg
  })
}
