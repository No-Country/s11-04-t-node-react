import { type Request, type Response } from 'express'
import { loginService } from '../services/barber.service'

export const login = async (req: Request, res: Response): Promise<void> => {
  const { phone } = req.body

  const { success, statusCode, token, msg } = await loginService(phone)
  res.status(statusCode).json({
    success,
    msg,
    token
  })
}
