import type { Request, Response } from 'express'
import { modifyClientService } from '../services/client.service'

export const modifyClient = async (req: Request, res: Response) => {
  const { id } = req.params
  const { body } = req

  const { success, msg, statusCode } = await modifyClientService(id, body)

  res.status(statusCode).json({
    success,
    msg
  })
}
