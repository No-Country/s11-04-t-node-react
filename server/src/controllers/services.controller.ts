import type { Request, Response } from 'express'
import { createServicesService } from '../services/services.service'

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
