import { ERROR_MSGS } from '../constants/errorMsgs'
import { HttpStatusCode } from '../constants/http'
import BarberModel from '../models/barber.model'
import { generateOTP } from '../utils/generateOTP.util'
import { generateHashOTP } from '../utils/hashOTP.util'
import { jwtOTPHash } from '../utils/jwtOTPHash.util'
import { sendEmail } from '../utils/mail.util'

interface ILoginUser {
  success: boolean
  msg: string
  statusCode: number
  token?: string
}

export const loginService = async (email: string): Promise<ILoginUser> => {
  try {
    console.log("antes de buscar al usuario");
    const user = await BarberModel.findOne({ email })
    console.log("encontro al usuario", user);
    if (!user) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: ERROR_MSGS.USER_NOT_FOUND
      }
    }

    console.log("antes de generar los codigos");

    const OTP = generateOTP()
    const hashOTP = generateHashOTP(OTP)
    const tokenOTP = await jwtOTPHash(hashOTP)

    console.log("antes de enviar el mail");

    // enviar el OTP al usuario que quiere hacer login
    await sendEmail(user.email, OTP)

    return {
      success: true,
      msg: 'El código para usar la app fue enviado correctamente',
      statusCode: HttpStatusCode.OK,
      token: tokenOTP
    }
  } catch (err) {

    console.log(err);

    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: 'Error al intentar hacer login del usuario'
    }

  }
}
