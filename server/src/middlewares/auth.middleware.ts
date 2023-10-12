import type { NextFunction, Request, Response } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { isValidObjectId } from 'mongoose'
import { SECRET_KEY_APP_USE_JWT } from '../config'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HttpStatusCode } from '../constants/http'
import { internalServerError, notFound } from '../handlers/response.handler'
import BarberModel from '../models/barber.model'
import { type JwtOtpVerificationResponse } from '../types/barber.type'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.token

    const { barberId } = jwt.verify(
      token,
      SECRET_KEY_APP_USE_JWT
    ) as JwtPayload & JwtOtpVerificationResponse

    if (barberId === '') {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        msg: ERROR_MSGS.VERIFY_OTP_INVALID_REQUEST
      })
    }

    if (!isValidObjectId(barberId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        msg: ERROR_MSGS.VERIFY_OTP_INVALID_USER_ID
      })
    }

    const barber = await BarberModel.findById(barberId)

    if (!barber) {
      return notFound(res)
    }

    if (barber?.role) req.role = barber?.role
    next()
  } catch (error: any) {
    console.log(error)

    if (error.name === 'TokenExpiredError') {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        tokenExpired: true,
        msg: ERROR_MSGS.TOKEN_APP_EXPIRED
      })
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        msg: `${error.message} 😭😭😭`
      })
    }
    internalServerError(res)
  }
}
