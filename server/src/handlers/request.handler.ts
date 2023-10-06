import { type NextFunction, type Request, type Response } from 'express'
import { validationResult } from 'express-validator'
import { HttpStatusCode } from '../constants/http'

const { BAD_REQUEST } = HttpStatusCode

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return res.status(BAD_REQUEST).json({ message: errors.array()[0].msg })
  next()
}

export default validate
