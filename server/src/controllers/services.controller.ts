import type { Request, Response } from 'express'
import {
  createServicesService,
  deleteServiceService,
  getServiceService,
  modifyServiceService
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

export const getService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { statusCode, success, msg, service } = await getServiceService(id)

  res.status(statusCode).json({
    success,
    msg,
    service
  })
}

export const modifyService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { body } = req

  const { success, statusCode, msg } = await modifyServiceService(id, body)

  res.status(statusCode).json({
    success,
    msg
  })
}
