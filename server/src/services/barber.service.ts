import validator from 'validator'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HttpStatusCode } from '../constants/http'
import { SUCCESS_MSGS } from '../constants/successMsgs'
import {
  duplicateKeyErrorHandler,
  mongooseValidatonErrorHandler
} from '../handlers/mongooseErrors.handler'
import BarberModel from '../models/barber.model'
import type {
  Barber,
  CreateBarberProps,
  ICreateBarber,
  ILoginUser
} from '../types/barber.type'
import { generateOTP } from '../utils/generateOTP.util'
import { generateHashOTP } from '../utils/hashOTP.util'
import { jwtOTPHash } from '../utils/jwtOTPHash.util'
import { sendEmail } from '../utils/mail.util'

export const loginService = async (email: string): Promise<ILoginUser> => {
  try {
    // Revisar que el correo tenga formato de email
    if (!validator.isEmail(email)) {
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
    const tokenOTP = await jwtOTPHash(hashOTP, barber._id)

    // enviar el OTP al usuario que quiere hacer login
    await sendEmail(barber.email, OTP)

    return {
      success: true,
      msg: SUCCESS_MSGS.OTP_SENT,
      statusCode: HttpStatusCode.OK,
      token: tokenOTP
    }
  } catch (err) {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.LOGIN_ERROR
    }
  }
}

export const createBarberService = async (
  body: CreateBarberProps
): Promise<ICreateBarber> => {
  try {
    const { fullName, phone, email, services, role } = body

    // Revisar que el correo tenga formato de email
    if (!validator.isEmail(email)) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.EMAIL_INVALID
      }
    }

    // Revisar que el usuario exista en la base de datos
    const barber = await BarberModel.findOne({ email })
    if (barber) {
      return {
        success: false,
        statusCode: HttpStatusCode.CONFLICT,
        msg: ERROR_MSGS.USER_ALREADY_EXISTS
      }
    }

    // Crear el barbero
    const newBarber = await BarberModel.create({
      fullName,
      phone,
      email,
      services,
      role
    })

    return {
      success: true,
      msg: SUCCESS_MSGS.BARBER_CREATED,
      statusCode: HttpStatusCode.CREATED,
      barber: newBarber
    }
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: mongooseValidatonErrorHandler(err)
      }
    }
    if (err.code === 11000) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: duplicateKeyErrorHandler(err)
      }
    }
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.BARBER_CREATION_ERROR
    }
  }
}

export const getBarbersService = async () => {
  try {
    const barbers = await BarberModel.find()
    return {
      success: true,
      msg: SUCCESS_MSGS.GET_BARBERS_SUCCESS,
      statusCode: HttpStatusCode.OK,
      barbers
    }
  } catch (err) {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.DB_CONNECTION_ERROR
    }
  }
}

export const deleteBarberService = async (id: string) => {
  try {
    const barber = await BarberModel.findById(id)
    if (!barber) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.BARBERID_INVALID
      }
    }
    await barber.deleteOne()
    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.DELETED_BARBER_SUCCESS
    }
  } catch (err: any) {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.SERVER_ERROR
    }
  }
}

export const getBarberByIdService = async (id: string) => {
  try {
    const barber = await BarberModel.findById(id)
    if (!barber) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.BARBERID_INVALID
      }
    }
    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.GET_BARBER_SUCCESS,
      barber
    }
  } catch (err: any) {
    console.log(err)

    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.SERVER_ERROR
    }
  }
}

export const modifyBarberService = async (id: string, body: Barber) => {
  try {
    const barber = await BarberModel.findById(id)
    if (!barber) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.BARBERID_INVALID
      }
    }

    await BarberModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true
    })

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.MODIFIED_BARBER_SUCCESS
    }
  } catch (err) {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.SERVER_ERROR
    }
  }
}

export const getBarbersWithTheirServicesService = async () => {
  try {
    const barbers = await BarberModel.find().populate('services')
    return {
      success: true,
      msg: SUCCESS_MSGS.GET_BARBERS_WITH_THEIR_SERVICES_SUCCESS,
      statusCode: HttpStatusCode.OK,
      barbers
    }
  } catch (err) {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.DB_CONNECTION_ERROR
    }
  }
}
