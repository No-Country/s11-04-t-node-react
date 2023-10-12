import type { Request, Response } from 'express'
import {
  createServicesService,
  deleteServiceService
} from '../services/services.service'

export const createService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { body } = req
  const { success, statusCode, msg, service } =
    await createServicesService(body)

  res.status(statusCode).json({
    success,
    msg,
    service
  })
}

export const deleteService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { statusCode, success, msg } = await deleteServiceService(id)

  res.status(statusCode).json({
    success,
    msg
  })
}
