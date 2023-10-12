import jwt, { type JwtPayload } from 'jsonwebtoken'
import { isValidObjectId } from 'mongoose'
import { SECRET_KEY_OTP_JWT } from '../config'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HttpStatusCode } from '../constants/http'
import { SUCCESS_MSGS } from '../constants/successMsgs'
import BarberModel from '../models/barber.model'
import type {
  IVerifyAuth,
  JwtOtpVerificationResponse,
  VerifyOTPProps
} from '../types/barber.type'
import { compareOTPWithItsHash } from '../utils/hashOTP.util'
import { jwtForApp } from '../utils/jwtForApp.util'

export const verifyEmailService = async (
  userData: VerifyOTPProps,
  tokenOTP: string
): Promise<IVerifyAuth> => {
  try {
    const { otp } = userData

    // Validamos el otp que nos envía el usuario usando el token que tiene el OTP hash
    const { otpHash, barberId } = jwt.verify(
      tokenOTP,
      SECRET_KEY_OTP_JWT
    ) as JwtPayload & JwtOtpVerificationResponse

    if (barberId === '' || otp.trim().length === 0) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.VERIFY_OTP_INVALID_REQUEST
      }
    }

    if (!isValidObjectId(barberId)) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.VERIFY_OTP_INVALID_USER_ID
      }
    }

    // Buscamos al usuario en la base de datos
    const barber = await BarberModel.findById(barberId)
    if (!barber) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: ERROR_MSGS.USER_NOT_FOUND
      }
    }

    const isMatched = compareOTPWithItsHash(otp, otpHash)
    if (!isMatched) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.VERIFY_OTP_INVALID_OTP
      }
    }

    // Generamos el token para que el usuario pueda usar la app
    const appToken = await jwtForApp(barberId)

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.VERIFY_OTP_SUCCESS,
      token: appToken,
      fullName: barber?.fullName,
      role: barber?.role
    }
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.VERIFY_OTP_TOKEN_EXPIRED
      }
    }

    console.log(err)

    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.VERIFY_OTP_ERROR
    }
  }
}
