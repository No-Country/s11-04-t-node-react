import type { Request, Response } from 'express'
import {
  createClientService,
  getClientsAppointmentsService,
  getClientsService,
  modifyClientService
} from '../services/client.service'

export const modifyClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { body } = req

  const { success, msg, statusCode } = await modifyClientService(id, body)

  res.status(statusCode).json({
    success,
    msg
  })
}

export const getClients = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const { success, msg, statusCode, clients } = await getClientsService()
  res.status(statusCode).json({
    success,
    msg,
    clients
  })
}

export const createClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { body } = req
  const { success, msg, statusCode, client } = await createClientService(body)

  res.status(statusCode).json({
    success,
    msg,
    client
  })
}

export const getClientAppointments = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { success, msg, statusCode, appointments } =
    await getClientsAppointmentsService(id)
  res.status(statusCode).json({
    success,
    msg,
    appointments
  })
}
