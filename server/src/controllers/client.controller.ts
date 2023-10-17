import type { Request, Response } from 'express'
import {
  deleteClientService,
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

export const deleteClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params

  const { success, msg, statusCode } = await deleteClientService(id)

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
