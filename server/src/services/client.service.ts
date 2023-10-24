import validator from 'validator'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HttpStatusCode } from '../constants/http'
import { SUCCESS_MSGS } from '../constants/successMsgs'
import {
  duplicateKeyErrorHandler,
  mongooseValidatonErrorHandler
} from '../handlers/mongooseErrors.handler'
import ClientModel from '../models/client.model'
import type {
  Client,
  ClientResponse,
  ClientsResponse
} from '../types/client.type'
import AppointmentModel from '../models/appointment.model'

export const modifyClientService = async (
  id: string,
  body: Client
): Promise<ClientResponse> => {
  try {
    const client = ClientModel.findById(id)
    if (!client) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.CLIENTID_INVALID
      }
    }

    // Revisar que el correo tenga formato válido
    if (body.email && !validator.isEmail(body.email)) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.EMAIL_INVALID
      }
    }

    await ClientModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true
    })

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.MODIFIED_CLIENT_SUCCESS
    }
  } catch (error) {
    console.log(error)

    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.SERVER_ERROR
    }
  }
}

export const getClientsService = async (): Promise<ClientsResponse> => {
  try {
    const clients = await ClientModel.find()
    return {
      success: true,
      msg: SUCCESS_MSGS.GET_CLIENTS_SUCCESS,
      statusCode: HttpStatusCode.OK,
      clients
    }
  } catch (err) {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.SERVER_ERROR
    }
  }
}

export const createClientService = async (
  body: Client
): Promise<ClientResponse> => {
  try {
    const { fullName, phone, email } = body

    // Revisar si el cliente ya existe
    const client = await ClientModel.findOne({ email })
    if (client) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.CLIENT_ALREADY_EXISTS
      }
    }

    // Revisar que el correo tenga formato de email
    if (!validator.isEmail(email)) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.EMAIL_INVALID
      }
    }

    // Crear el cliente
    const newClient = await ClientModel.create({
      fullName,
      phone,
      email
    })

    return {
      success: true,
      msg: SUCCESS_MSGS.CLIENT_CREATED,
      statusCode: HttpStatusCode.CREATED,
      client: newClient
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
      msg: ERROR_MSGS.CLIENT_CREATION_ERROR
    }
  }
}

export const getClientsAppointmentsService = async (id: string) => {
  try {
    const client = await ClientModel.findById(id)
    if (!client) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.CLIENT_ALREADY_EXISTS
      }
    }

    const appointments = await AppointmentModel.find({ clientId: id })
    if (appointments.length === 0) {
      return {
        success: true,
        msg: ERROR_MSGS.CLIENT_WITHOUT_APPOINTMENTS,
        statusCode: HttpStatusCode.NOT_FOUND
      }
    }

    return {
      success: true,
      msg: SUCCESS_MSGS.GET_APPOINTMENTS_SUCCESS,
      statusCode: HttpStatusCode.OK,
      appointments
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.SERVER_ERROR
    }
  }
}
