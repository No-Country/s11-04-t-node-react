import validator from 'validator'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HttpStatusCode } from '../constants/http'
import { SUCCESS_MSGS } from '../constants/successMsgs'
import BarberModel from '../models/barber.model'
import { type ILoginUser } from '../types/barber.type'
import { generateOTP } from '../utils/generateOTP.util'
import { generateHashOTP } from '../utils/hashOTP.util'
import { jwtOTPHash } from '../utils/jwtOTPHash.util'
import { sendEmail } from '../utils/mail.util'

export const loginService = async (email: string): Promise<ILoginUser> => {
  try {
    // Revisar que el correo tenga formato de email
    if (validator.isEmail(email) === false) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.EMAIL_INVALID
      }
    }

    // Revisar que el usuario exista en la base de datos
    const barber = await BarberModel.findOne({ email })
    if (!barber) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: ERROR_MSGS.USER_NOT_FOUND
      }
    }

    const OTP = generateOTP()
    const hashOTP = generateHashOTP(OTP)
    const tokenOTP = await jwtOTPHash(hashOTP)

    // enviar el OTP al usuario que quiere hacer login
    await sendEmail(barber.email, OTP)

    return {
      success: true,
      msg: SUCCESS_MSGS.OTP_SENT,
      statusCode: HttpStatusCode.OK,
      token: tokenOTP,
      barberId: barber?._id
    }
  } catch (err) {
    console.log(err)

    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.LOGIN_ERROR
    }
  }
}
