import { ERROR_MSGS } from '../constants/errorMsgs'
import { HttpStatusCode } from '../constants/http'
import BarberModel from '../models/barber.model'
import { generateOTP } from '../utils/generateOTP.util'
import { generateHashOTP } from '../utils/hashOTP.util'
import { jwtOTPHash } from '../utils/jwtOTPHash.util'
import { sendSms } from '../utils/twilio.util'

interface ILoginUser {
  success: boolean
  msg: string
  statusCode: number
  token?: string
}

export const loginService = async (phone: string): Promise<ILoginUser> => {
  try {
    const user = await BarberModel.findOne({ phone })
    if (!user) {
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
    await sendSms(OTP, user.phone)

    return {
      success: true,
      msg: 'El código para usar la app fue enviado correctamente',
      statusCode: HttpStatusCode.OK,
      token: tokenOTP
    }
  } catch (err) {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: 'Error al intentar hacer login del usuario'
    }
  }
}
