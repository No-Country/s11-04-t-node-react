import { HttpStatusCode } from '../constants/http'
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
import {
  getServicePrice,
  isBarberValid,
  isClientValid,
  isServiceValid
} from './dbValidations.services'

export const deleteAppoimentService = async (id: string) => {
  try {
    const appointment = await AppointmentModel.findById(id)
    if (!appointment) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.APPOIMENTID_INVALID
      }
    }
    await appointment.deleteOne()
    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.DELETED_APPOINTMENT_SUCCESS
    }
  } catch {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
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
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.APPOIMENTID_INVALID
      }
    }
    await AppointmentModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true
    })

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.MODIFIED_APPOINTMENT_SUCCESS
    }
  } catch {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.SERVER_ERROR
    }
  }
}

export const createAppointmentService = async (
  body: AppointmentBody
): Promise<AppointmentResponse> => {
  try {
    const { date, startTime, endTime, barberId, clientId, services } = body

    // Validacion de la existencia del cliente y el barbero:
    if (!(await isClientValid(clientId))) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.CLIENTID_INVALID
      }
    }
    if (!(await isBarberValid(barberId))) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.BARBERID_INVALID
      }
    }

    // Revisar que el startTime y el endTime tengan el formato HH:mm, formato de 24 horas
    if (!validator.isTime(startTime) || !validator.isTime(endTime)) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.TIME_FORMAT_INVALID
      }
    }

    // El endTime sea mayor al startTime:

    // Divido las cadenas de tiempo en horas y minutos
    const startTimeParts = startTime.split(':')
    const endTimeParts = endTime.split(':')

    // Paso a numeros
    const startHour = parseInt(startTimeParts[0], 10)
    const startMinute = parseInt(startTimeParts[1], 10)
    const endHour = parseInt(endTimeParts[0], 10)
    const endMinute = parseInt(endTimeParts[1], 10)

    if (
      startHour > endHour ||
      (startHour === endHour && startMinute >= endMinute)
    ) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.TIME_INVALID
      }
    }

    // Duracion de la cita:

    // Diferencia en minutos
    const hoursDifference = endHour - startHour
    const minutesDifference = endMinute - startMinute

    // Duración en minutos
    const durationInMinutes = hoursDifference * 60 + minutesDifference

    // Revisar que la fecha tenga un formato válida
    if (!dayjs(date, 'DD-MM-YYYY', true).isValid()) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.DATE_INVALID_FORMAT
      }
    }

    // Revisar que la fecha de la cita no sea menor a la actual
    const currentDateFormated = dayjs().format('YYYY-MM-DD')
    const dateformated = dayjs(date).format('YYYY-MM-DD')
    if (validator.isBefore(dateformated, currentDateFormated)) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.DATE_INVALID
      }
    }

    // Validar solapeo

    const existingAppointments = await AppointmentModel.find({
      barberId,
      date,
      status: "pending"
    })

    let hasOverlap = false // Variable para rastrear si se ha encontrado una superposición

    existingAppointments.forEach((existingAppointment) => {
      // Si ya existe una cita con el mismo barbero en la misma fecha, verifica si hay superposición en el tiempo
      if (
        endTime > existingAppointment.startTime &&
        startTime < existingAppointment.endTime
      ) {
        hasOverlap = true
      }
    })
    if (hasOverlap) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.APPOINTMENT_ALREADY_EXISTS_IN_THAT_TIME
      }
    }

    // Validar los servicios
    const areAllServicesValid = await Promise.all(
      services.map(async (serviceId) => await isServiceValid(serviceId))
    )
    let totalPrice = 0
    // Verificar si todos los servicios son válidos
    if (areAllServicesValid.every((isValid) => isValid)) {
      // Calculo el totalPrice acumulando los precios de los servicios
      totalPrice = await services.reduce(async (accumulator, serviceId) => {
        const servicePrice = await getServicePrice(serviceId)
        return (await accumulator) + servicePrice
      }, Promise.resolve(0))
    } else {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.SERVICEID_INVALID
      }
    }

    const appointment = await AppointmentModel.create({
      startTime,
      endTime,
      date,
      clientId,
      barberId,
      status: 'pending',
      totalPrice,
      services
    })

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.CREATED_APPOINTMENT_SUCCESS,
      appointment,
      durationInMinutes
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

export const completeAppointmentService = async (id: string) => {
  try {
    const appointment = await AppointmentModel.findById(id)
    if (!appointment) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.APPOIMENTID_INVALID
      }
    }

    if (appointment.status !== 'pending') {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.APPOINTMENT_NOT_PENDING
      }
    }

    appointment.status = 'completed'
    await appointment.save()

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.APPOINTMENT_COMPLETED
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
