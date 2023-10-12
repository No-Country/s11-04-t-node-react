import type { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../constants/http'
import { ERROR_MSGS } from '../constants/errorMsgs'

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const role = req.role
  if (role !== 'admin') {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      succes: false,
      msg: ERROR_MSGS.UNAUTHORIZED
    })
  }
  next()
}

export const isBarber = (req: Request, res: Response, next: NextFunction) => {
  const role = req.role
  if (role !== 'barber') {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      succes: false,
      msg: ERROR_MSGS.UNAUTHORIZED
    })
  }
  next()
}
