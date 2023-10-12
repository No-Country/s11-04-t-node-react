import { type NextFunction, type Request, type Response } from 'express'
import { validationResult } from 'express-validator'
import { badRequest } from './response.handler'

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return badRequest(res, errors.array()[0].msg)
  next()
}

export default validate
