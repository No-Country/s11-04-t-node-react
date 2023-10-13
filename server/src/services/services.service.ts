import validator from 'validator'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HttpStatusCode } from '../constants/http'
import { SUCCESS_MSGS } from '../constants/successMsgs'
import {
  duplicateKeyErrorHandler,
  mongooseValidatonErrorHandler
} from '../handlers/mongooseErrors.handler'
import ServiceModel from '../models/service.model'
import type {
  BodyService,
  Service,
  ServicesResponse
} from '../types/service.type'

export const createServicesService = async (
  body: BodyService
): Promise<ServicesResponse> => {
  try {
    const { name, price, duration } = body

    // Revisar que el servicio no exista en la base de datos
    const service = await ServiceModel.findOne({ name })
    if (service) {
      return {
        success: false,
        statusCode: HttpStatusCode.CONFLICT,
        msg: ERROR_MSGS.SERVICE_EXISTS
      }
    }

    // Verificar que price y duration sean números
    if (!validator.isNumeric(price) || !validator.isNumeric(duration)) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_NUMERIC_VALUES
      }
    }

    const newService = await ServiceModel.create({
      name,
      price,
      duration
    })

    return {
      success: true,
      msg: SUCCESS_MSGS.SERVICE_CREATED,
      statusCode: HttpStatusCode.CREATED,
      service: newService
    }
  } catch (err: any) {
    console.log(err)
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
      msg: ERROR_MSGS.SERVICE_CREATION_ERROR
    }
  }
}

export const deleteServiceService = async (
  id: string
): Promise<ServicesResponse> => {
  try {
    const service = await ServiceModel.findById(id)
    if (!service) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.SERVICEID_INVALID
      }
    }

    await service.deleteOne()
    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.DELETED_SERVICE_SUCCES
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

export const getServiceService = async (
  id: string
): Promise<ServicesResponse> => {
  try {
    const service = await ServiceModel.findById(id)
    if (!service) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.SERVICEID_INVALID
      }
    }

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.GET_SERVICE_SUCCES,
      service
    }
  } catch (err) {
    console.log(err)

    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.SERVER_ERROR
    }
  }
}

export const modifyServiceService = async (id: string, body: Service) => {
  try {
    const service = await ServiceModel.findById(id)
    if (!service) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.SERVICEID_INVALID
      }
    }

    await ServiceModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true
    })

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.MODIFIED_SERVICE_SUCCESS
    }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.SERVER_ERROR
    }
  }
}
