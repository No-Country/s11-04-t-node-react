import { type Request, type Response } from 'express'
import { loginService } from '../services/barber.service'
import { verifyEmailService } from '../services/verifyEmail.service'

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body

  const { success, statusCode, token, msg, barberId } =
    await loginService(email)

  res.status(statusCode).json({
    success,
    msg,
    token,
    barberId
  })
}

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const tokenOTP = req.token
  const body = req.body
  const { success, statusCode, msg, token, fullName, role } =
    await verifyEmailService(body, tokenOTP)

  res.status(statusCode).json({
    success,
    msg,
    token,
    fullName,
    role
  })
}
