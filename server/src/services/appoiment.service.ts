import { HttpStatusCode } from 'axios'
import AppointmentModel from '../models/appointment.model'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { SUCCESS_MSGS } from '../constants/successMsgs'
import type { Appointment } from '../types/appointment.type'

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
