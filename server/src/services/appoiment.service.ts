import { HttpStatusCode } from 'axios'
import dayjs from 'dayjs'
import validator from 'validator'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { SUCCESS_MSGS } from '../constants/successMsgs'
import AppointmentModel from '../models/appointment.model'
import type {
  Appointment,
  AppointmentBody,
  AppointmentResponse
} from '../types/appointment.type'

export const deleteAppoimentService = async (id: string) => {
  try {
    const appointment = await AppointmentModel.findById(id)
    if (!appointment) {
      return {
        success: false,
        statusCode: HttpStatusCode.BadRequest,
        msg: ERROR_MSGS.APPOIMENTID_INVALID
      }
    }
    await appointment.deleteOne()
    return {
      success: true,
      statusCode: HttpStatusCode.Ok,
      msg: SUCCESS_MSGS.DELETED_APPOINTMENT_SUCCESS
    }
  } catch {
    return {
      success: false,
      statusCode: HttpStatusCode.InternalServerError,
      msg: ERROR_MSGS.SERVER_ERROR
    }
  }
}

export const modifyAppointmentService = async (
  id: string,
  body: Appointment
) => {
  try {
    const appointment = await AppointmentModel.findById(id)
    if (!appointment) {
      return {
        success: false,
        statusCode: HttpStatusCode.BadRequest,
        msg: ERROR_MSGS.APPOIMENTID_INVALID
      }
    }
    await AppointmentModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true
    })

    return {
      success: true,
      statusCode: HttpStatusCode.Ok,
      msg: SUCCESS_MSGS.MODIFIED_APPOINTMENT_SUCCESS
    }
  } catch {
    return {
      success: false,
      statusCode: HttpStatusCode.InternalServerError,
      msg: ERROR_MSGS.SERVER_ERROR
    }
  }
}

export const createAppointmentService = async (
  body: AppointmentBody
): Promise<AppointmentResponse> => {
  try {
    const { date, startTime, endTime } = body

    // Revisar que el starTime y el endTime tengan el formato HH:mm, formato de 24 horas
    if (!validator.isTime(startTime) || !validator.isTime(endTime)) {
      return {
        success: false,
        statusCode: HttpStatusCode.BadRequest,
        msg: ERROR_MSGS.TIME_FORMAT_INVALID
      }
    }

    // Revisar que la fecha tenga un formato válida
    if (!dayjs(date).isValid()) {
      return {
        success: false,
        statusCode: HttpStatusCode.BadRequest,
        msg: ERROR_MSGS.DATE_INVALID_FORMAT
      }
    }

    // Revisar que la fecha de la cita no sea menor a la actual
    const currentDate = dayjs().format('DD-MM-YYYY')
    const diff = dayjs(date).diff(currentDate, 'day')
    console.log('Veamos la diferencia: ', diff)
    if (diff < 0) {
      return {
        success: false,
        statusCode: HttpStatusCode.BadRequest,
        msg: ERROR_MSGS.DATE_INVALID
      }
    }

    // TODO: revisar que el endTime sea mayor al startTime

    // Comprobar que otro usuario no tenga una cita en la misma fecha y hora
    const appointment = (await AppointmentModel.findOne({
      date,
      startTime: { $gte: startTime, $lte: endTime }
    })) as Appointment

    return {
      success: true,
      statusCode: HttpStatusCode.Ok,
      msg: SUCCESS_MSGS.CREATED_APPOINTMENT_SUCCESS,
      appointment
    }
  } catch (error) {
    return {
      success: false,
      statusCode: HttpStatusCode.InternalServerError,
      msg: ERROR_MSGS.SERVER_ERROR
    }
  }
}
