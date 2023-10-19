import type { NextFunction, Request, Response } from 'express'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HttpStatusCode } from '../constants/http'

export const extractToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]
  if (!token) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      msg: ERROR_MSGS.TOKEN_APP_NOT_FOUND
    })
  }
  req.token = token
  next()
}
