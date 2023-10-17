import type { Request, Response } from 'express'
import {
  deleteClientService,
  modifyClientService
} from '../services/client.service'

export const modifyClient = async (req: Request, res: Response) => {
  const { id } = req.params
  const { body } = req

  const { success, msg, statusCode } = await modifyClientService(id, body)

  res.status(statusCode).json({
    success,
    msg
  })
}

export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params

  const { success, msg, statusCode } = await deleteClientService(id)

  res.status(statusCode).json({
    success,
    msg
  })
}
