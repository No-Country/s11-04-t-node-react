import { HttpStatusCode } from 'axios'
import AppointmentModel from '../models/appointment.model'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { SUCCESS_MSGS } from '../constants/successMsgs'

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
