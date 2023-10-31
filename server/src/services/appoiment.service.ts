import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import validator from 'validator'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HttpStatusCode } from '../constants/http'
import { SUCCESS_MSGS } from '../constants/successMsgs'
import AppointmentModel from '../models/appointment.model'
import ClientModel from '../models/client.model'
import {
  AppointmentStatus,
  type Appointment,
  type AppointmentBody,
  type AppointmentResponse,
  type AppointmentsResponse
} from '../types/appointment.type'
import {
  generateCancelAppointmentTemplate,
  generateNewAppointmentTemplate
} from '../utils/emailTemplates'
import { sendEmail } from '../utils/mail.util'
import {
  calculateDurationInMinutes,
  calculateServicesTotalPrice,
  differenceBtwNowAndDate,
  existingAppointments,
  existingAppointmentsWhenUpdating,
  getServicesNames,
  isStartTimeGreaterThanEndTime
} from './dbValidations.services'
dayjs.extend(customParseFormat)

export const modifyAppointmentService = async (
  id: string,
  clientId: string,
  body: AppointmentBody,
  barberInSession: string
): Promise<AppointmentResponse> => {
  try {
    let durationInMinutes: number | undefined
    let recalculatedTotalPrice: number | undefined
    const appointment = await AppointmentModel.findById(id)
    if (!appointment) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.APPOIMENTID_INVALID
      }
    }

    const { barberId } = appointment

    // Valido que el usuario en sesión sea el barbero de la cita a modificar
    if (barberInSession !== barberId.toString()) {
      return {
        success: false,
        statusCode: HttpStatusCode.UNAUTHORIZED,
        msg: ERROR_MSGS.APPOINTMENTS_UNAUTHORIZED
      }
    }

    const { date, startTime, endTime, services } = body

    // Forzar a que siempre me envíen la fecha de la cita
    if (!date) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.DATE_REQUIRED
      }
    }

    // Revisar que la fecha tenga un formato válida
    if (!dayjs(date, 'DD-MM-YYYY', true).isValid()) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.DATE_INVALID_FORMAT
      }
    }

    if (appointment.status !== AppointmentStatus.PENDING) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.APPOINTMENT_NOT_PENDING
      }
    }

    if ((startTime && !endTime) || (!startTime && endTime)) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.STAR_TIME_AND_END_TIME_REQUIRED
      }
    }

    // Revisar que el startTime y el endTime tengan el formato HH:mm, formato de 24 horas
    if (startTime && endTime) {
      // Revisar que las horas tengan una longitud de 5 caracteres
      if (startTime.length !== 5 || endTime.length !== 5) {
        return {
          success: false,
          statusCode: HttpStatusCode.BAD_REQUEST,
          msg: ERROR_MSGS.TIME_LENGTH_INVALID
        }
      }

      if (!validator.isTime(startTime) || !validator.isTime(endTime)) {
        return {
          success: false,
          statusCode: HttpStatusCode.BAD_REQUEST,
          msg: ERROR_MSGS.TIME_FORMAT_INVALID
        }
      }

      // Revisar que el endTime sea mayor al startTime
      if (isStartTimeGreaterThanEndTime(startTime, endTime)) {
        return {
          success: false,
          statusCode: HttpStatusCode.BAD_REQUEST,
          msg: ERROR_MSGS.TIME_INVALID
        }
      }

      // Duración de la cita en minutos
      durationInMinutes = calculateDurationInMinutes(startTime, endTime)
    }

    // Revisar que la fecha de la cita no sea menor a la actual
    const differenceInDays = differenceBtwNowAndDate(date)

    if (differenceInDays < 0) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.DATE_INVALID
      }
    }

    // Revisar que la fecha de la cita no sea mayor a 30 días de la actual
    if (differenceInDays > 30) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.DATE_TOO_FAR
      }
    }

    if (services) {
      if (services.length === 0) {
        return {
          success: false,
          statusCode: HttpStatusCode.BAD_REQUEST,
          msg: ERROR_MSGS.SERVICES_IDS_REQUIRED
        }
      }

      recalculatedTotalPrice = await calculateServicesTotalPrice(services)
      if (recalculatedTotalPrice === 0) {
        return {
          success: false,
          statusCode: HttpStatusCode.BAD_REQUEST,
          msg: ERROR_MSGS.CALCULATE_SERVICES_TOTAL_PRICE_ERROR
        }
      }
    }

    // Validar solapeo
    if (
      await existingAppointmentsWhenUpdating(
        startTime,
        endTime,
        barberId,
        clientId,
        date,
        id
      )
    ) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.APPOINTMENT_ALREADY_EXISTS_IN_THAT_TIME
      }
    }

    const modifiedAppointment = (await AppointmentModel.findByIdAndUpdate(
      { _id: id },
      { ...body, totalPrice: recalculatedTotalPrice },
      {
        new: true,
        runValidators: true
      }
    )) as Appointment

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.MODIFIED_APPOINTMENT_SUCCESS,
      appointment: modifiedAppointment,
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

export const createAppointmentService = async (
  body: AppointmentBody,
  barberId: string
): Promise<AppointmentResponse> => {
  try {
    const { date, startTime, endTime, clientId, services } = body

    // Validacion de la existencia del cliente
    const client = await ClientModel.findById(clientId)
    if (!client) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.CLIENTID_INVALID
      }
    }

    // Revisar que las horas tengan una longitud de 5 caracteres
    if (startTime.length !== 5 || endTime.length !== 5) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.TIME_LENGTH_INVALID
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

    // Revisar que el endTime sea mayor al startTime:
    if (isStartTimeGreaterThanEndTime(startTime, endTime)) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.TIME_INVALID
      }
    }

    // Duración de la cita en minutos
    const durationInMinutes = calculateDurationInMinutes(startTime, endTime)

    // Revisar que la fecha tenga un formato válida
    if (!dayjs(date, 'DD-MM-YYYY', true).isValid()) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.DATE_INVALID_FORMAT
      }
    }

    // Revisar que la fecha de la cita no sea menor a la actual
    const differenceInDays = differenceBtwNowAndDate(date)

    if (differenceInDays < 0) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.DATE_INVALID
      }
    }

    // Revisar que la fecha de la cita no sea mayor a 30 días de la actual
    if (differenceInDays > 30) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.DATE_TOO_FAR
      }
    }

    // Validar solapeo
    if (await existingAppointments(startTime, endTime, barberId, date)) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.APPOINTMENT_ALREADY_EXISTS_IN_THAT_TIME
      }
    }

    // Validar que se hayan seleccionado servicios
    if (services.length === 0) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.SERVICES_IDS_REQUIRED
      }
    }

    const totalPrice = await calculateServicesTotalPrice(services)
    if (totalPrice === 0) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.CALCULATE_SERVICES_TOTAL_PRICE_ERROR
      }
    }

    const appointment = await AppointmentModel.create({
      startTime,
      endTime,
      date,
      clientId,
      barberId,
      totalPrice,
      services
    })

    // Obtener todos los nombres de servicios para el mail
    const servicesToEmail = await getServicesNames(services)

    await sendEmail(
      client.email,
      generateNewAppointmentTemplate(
        appointment.date,
        appointment.startTime,
        servicesToEmail,
        appointment.totalPrice
      ),
      SUCCESS_MSGS.APPOINTMENT_CREATION_EMAIL_SUBJECT
    )

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

export const completePendingAppointmentService = async (
  id: string,
  barberInSession: string
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

    const { startTime, endTime, barberId, date, status, totalPrice } =
      appointment
    const clientId = appointment.clientId.toString()

    // Valido que el usuario en sesión sea el barbero de la cita a modificar
    if (barberInSession !== barberId.toString()) {
      return {
        success: false,
        statusCode: HttpStatusCode.UNAUTHORIZED,
        msg: ERROR_MSGS.APPOINTMENTS_UNAUTHORIZED
      }
    }

    if (status === AppointmentStatus.CANCELLED) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.APPOINTMENT_NOT_PENDING_OR_COMPLETED
      }
    }

    // Calcular de nuevo el precio total de los servicios
    const newTotalPrice = await calculateServicesTotalPrice(
      appointment.services
    )

    if (status === AppointmentStatus.COMPLETED) {
      // Validar solapeo
      if (
        await existingAppointmentsWhenUpdating(
          startTime,
          endTime,
          barberId,
          clientId,
          date,
          id
        )
      ) {
        return {
          success: false,
          statusCode: HttpStatusCode.BAD_REQUEST,
          msg: ERROR_MSGS.APPOINTMENT_ALREADY_EXISTS_IN_THAT_TIME
        }
      }

      if (newTotalPrice !== totalPrice) {
        await AppointmentModel.findByIdAndUpdate(
          id,
          { status: AppointmentStatus.PENDING, totalPrice: newTotalPrice },
          { new: true, runValidators: true }
        )
      }

      await AppointmentModel.findByIdAndUpdate(
        id,
        {
          status: AppointmentStatus.PENDING
        },
        { new: true, runValidators: true }
      )
      return {
        success: true,
        statusCode: HttpStatusCode.OK,
        msg: SUCCESS_MSGS.APPOINTMENT_FROM_COMPLETED_TO_PENDING
      }
    }

    if (newTotalPrice !== totalPrice) {
      await AppointmentModel.findByIdAndUpdate(
        id,
        { status: AppointmentStatus.COMPLETED, totalPrice: newTotalPrice },
        { new: true, runValidators: true }
      )
    }

    await AppointmentModel.findByIdAndUpdate(
      id,
      { status: AppointmentStatus.COMPLETED },
      { new: true, runValidators: true }
    )

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

export const cancelPendingAppointmentService = async (
  id: string,
  barberInSession: string
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

    const { startTime, endTime, barberId, date, status, totalPrice } =
      appointment
    const clientId = appointment.clientId.toString()

    // Valido que el usuario en sesión sea el barbero de la cita a modificar
    if (barberInSession !== barberId.toString()) {
      return {
        success: false,
        statusCode: HttpStatusCode.UNAUTHORIZED,
        msg: ERROR_MSGS.APPOINTMENTS_UNAUTHORIZED
      }
    }

    if (status === AppointmentStatus.COMPLETED) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.APPOINTMENT_NOT_PENDING_OR_CANCELED
      }
    }

    // Calcular de nuevo el precio total de los servicios
    const newTotalPrice = await calculateServicesTotalPrice(
      appointment.services
    )

    if (status === AppointmentStatus.CANCELLED) {
      // Validar solapeo
      if (
        await existingAppointmentsWhenUpdating(
          startTime,
          endTime,
          barberId,
          clientId,
          date,
          id
        )
      ) {
        return {
          success: false,
          statusCode: HttpStatusCode.BAD_REQUEST,
          msg: ERROR_MSGS.APPOINTMENT_ALREADY_EXISTS_IN_THAT_TIME
        }
      }

      if (newTotalPrice !== totalPrice) {
        await AppointmentModel.findByIdAndUpdate(
          id,
          { status: AppointmentStatus.PENDING, totalPrice: newTotalPrice },
          { new: true, runValidators: true }
        )
      }

      await AppointmentModel.findByIdAndUpdate(
        id,
        {
          status: AppointmentStatus.PENDING
        },
        { new: true, runValidators: true }
      )
      return {
        success: true,
        statusCode: HttpStatusCode.OK,
        msg: SUCCESS_MSGS.APPOINTMENT_FROM_CANCELED_TO_PENDING
      }
    }

    if (newTotalPrice !== totalPrice) {
      await AppointmentModel.findByIdAndUpdate(
        id,
        { status: AppointmentStatus.CANCELLED, totalPrice: newTotalPrice },
        { new: true, runValidators: true }
      )
    }

    await AppointmentModel.findByIdAndUpdate(
      id,
      { status: AppointmentStatus.CANCELLED },
      { new: true, runValidators: true }
    )

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.APPOINTMENT_CANCELED
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

export const getAppointmentsService = async (
  barberId: string
): Promise<AppointmentsResponse> => {
  try {
    const appointments = await AppointmentModel.find(
      {
        barberId
      },
      { __v: 0 }
    )
      .populate({ path: 'clientId', select: ['_id', 'fullName', 'email'] })
      .populate({ path: 'barberId', select: ['_id', 'fullName', 'email'] })
      .populate({ path: 'services', select: ['_id', 'name', 'price'] })

    if (appointments.length === 0) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: ERROR_MSGS.APPOINTMENTS_NOT_FOUND
      }
    }
    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.GET_APPOINTMENTS_SUCCESS,
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

export const cancelAppointmentService = async (
  id: string
): Promise<AppointmentsResponse> => {
  try {
    const appointment = await AppointmentModel.findById(id)
    if (!appointment) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.APPOIMENTID_INVALID
      }
    }

    if (appointment.status !== AppointmentStatus.PENDING) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.APPOINTMENT_NOT_PENDING
      }
    }

    appointment.status = AppointmentStatus.CANCELLED
    await appointment.save()

    // Enviar el correo de aviso de cancelación:
    const client = await ClientModel.findById(appointment.clientId)
    if (!client) {
      return {
        success: true,
        statusCode: HttpStatusCode.OK,
        msg: ERROR_MSGS.CLIENT_NOT_FOUND
      }
    }

    await sendEmail(
      client.email,
      generateCancelAppointmentTemplate(
        appointment.date,
        appointment.startTime
      ),
      SUCCESS_MSGS.APPOINTMENT_CANCELATION_EMAIL_SUBJECT
    )

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.APPOINTMENT_CANCELED
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

export const getAppointmentsByDateService = async (
  barberId: string,
  date: string
): Promise<AppointmentsResponse> => {
  try {
    const appointments = await AppointmentModel.find(
      {
        date,
        barberId
      },
      { __v: 0 }
    )
      .populate({ path: 'clientId', select: ['_id', 'fullName', 'email'] })
      .populate({ path: 'barberId', select: ['_id', 'fullName', 'email'] })
      .populate({ path: 'services', select: ['_id', 'name', 'price'] })

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.GET_APPOINTMENTS_BY_DATE_SUCCESS,
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
