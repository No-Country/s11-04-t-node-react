import type { NextFunction, Request, Response } from 'express'

export const extractToken = (req: Request, _: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    req.token = token
  }
  next()
}
