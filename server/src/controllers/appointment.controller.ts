import { type Request, type Response } from 'express'
import {
  cancelAppointmentService,
  cancelPendingAppointmentService,
  completePendingAppointmentService,
  createAppointmentService,
  getAppointmentsByDateService,
  getAppointmentsService,
  modifyAppointmentService
} from '../services/appoiment.service'

export const modifyAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, clientId } = req.params
  const { body } = req
  const barberInSession = req.userInSessionId

  const { success, statusCode, msg, appointment, durationInMinutes } =
    await modifyAppointmentService(id, clientId, body, barberInSession)
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
  const barberId = req.userInSessionId
  const { success, statusCode, msg, appointment, durationInMinutes } =
    await createAppointmentService(body, barberId)
  res.status(statusCode).json({
    success,
    msg,
    appointment,
    durationInMinutes
  })
}

export const completePendingAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const barberInSession = req.userInSessionId

  const { success, msg, statusCode } = await completePendingAppointmentService(
    id,
    barberInSession
  )
  res.status(statusCode).json({
    success,
    msg
  })
}

export const cancelPendingAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const barberInSession = req.userInSessionId

  const { success, msg, statusCode } = await cancelPendingAppointmentService(
    id,
    barberInSession
  )
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

export const getAppointmentsByDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { date } = req.params
  const barberId = req.userInSessionId

  const { success, statusCode, msg, appointments } =
    await getAppointmentsByDateService(barberId, date)

  res.status(statusCode).json({
    success,
    msg,
    appointments
  })
}
