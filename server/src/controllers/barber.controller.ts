import { type Request, type Response } from 'express'
import { loginService } from '../services/barber.service'

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body

  const { success, statusCode, token, msg } = await loginService(email)

  res.status(statusCode).json({
    success,
    msg,
    token
  })
}
