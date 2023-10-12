import { isValidObjectId } from 'mongoose'
import { HttpStatusCode } from '../constants/http'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { SECRET_KEY_APP_USE_JWT } from '../config'
import BarberModel from '../models/barber.model'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { type JwtOtpVerificationResponse } from '../types/barber.type'
import type { NextFunction, Request, Response } from 'express'
import { internalServerError, notFound } from '../handlers/response.handler'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.token

    const { barberId } = jwt.verify(
      token,
      SECRET_KEY_APP_USE_JWT
    ) as JwtPayload & JwtOtpVerificationResponse

    if (barberId === '') {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        msg: ERROR_MSGS.VERIFY_OTP_INVALID_REQUEST
      })
    }

    if (!isValidObjectId(barberId)) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        msg: ERROR_MSGS.VERIFY_OTP_INVALID_USER_ID
      })
    }

    const barber = await BarberModel.findById(barberId)

    if (!barber) {
      notFound(res)
    }

    if (barber?.role) req.role = barber?.role

    next()
  } catch (error) {
    console.log(error)
    internalServerError(res)
  }
}
