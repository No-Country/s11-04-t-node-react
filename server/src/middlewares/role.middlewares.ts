import type { NextFunction, Request, Response } from 'express'
import { unauthorized } from '../handlers/response.handler'

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const role = req.role
  if (role !== 'admin') {
    unauthorized(res)
  }
  next()
}

export const isBarber = (req: Request, res: Response, next: NextFunction) => {
  const role = req.role
  if (role !== 'barber') {
    unauthorized(res)
  }
  next()
}