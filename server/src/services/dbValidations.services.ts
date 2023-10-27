import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Types, type ObjectId } from 'mongoose'
import AppointmentModel from '../models/appointment.model'
import ClientModel from '../models/client.model'
import ServiceModel from '../models/service.model'
import { AppointmentStatus } from '../types/appointment.type'
import { type Service } from '../types/service.type'
dayjs.extend(customParseFormat)

/**
 * Revisa si el cliente con el ID proporcionado, existe en la base de datos
 * @param clientId - el ID del cliente a revisasr
 * @returns una promesa que resuelve un boolean indicando si el cliente existe o no
 */
export const isClientValid = async (clientId: string) => {
  try {
    const client = await ClientModel.findById(clientId)
    return client !== null
  } catch (error) {
    return false
  }
}

/**
 * Construye un pipeline de agregación de MongoDB para calcular el precio total de un conjunto de servicios.
 * @param servicesIdsAsObjectIds Un arreglo de ObjectIds que representan los servicios a incluir en el cálculo.
 * @returns Un arreglo que representa el pipeline de agregación de MongoDB con el que se calcula el precio total de los servicios.
 */
export const calculateServicesTotalPrice = async (
  servicesIds: string[]
): Promise<number | undefined> => {
  const servicesIdsAsObjectIds = servicesIds.map((id) => new Types.ObjectId(id))

  try {
    const pipeline = [
      {
        $match: {
          _id: { $in: servicesIdsAsObjectIds }
        }
      },
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: '$price'
          }
        }
      }
    ]

    const result = await ServiceModel.aggregate(pipeline)
    return result[0]?.totalPrice || 0
  } catch (error) {
    throw new Error('Error al calcular el precio total de los servicios.')
  }
}

/**
 * Verifica si la hora de finalización es mayor que la hora de inicio.
 * @param startTime - La hora de inicio en formato de cadena (HH:mm).
 * @param endTime - La hora de finalización en formato de cadena (HH:mm).
 * @returns Verdadero si la hora de finalización es mayor que la hora de inicio, de lo contrario falso.
 */
export const isStartTimeGreaterThanEndTime = (
  startTime: string,
  endTime: string
): boolean => {
  // Divido las cadenas de tiempo en horas y minutos
  const { startHour, startMinute, endHour, endMinute } = timeInPieces(
    startTime,
    endTime
  )

  return (
    startHour > endHour || (startHour === endHour && startMinute >= endMinute)
  )
}

/**
 * Separa una hora en dos partes: hora y minutos.
 * @param startTime - La hora de inicio en formato HH:mm.
 * @param endTime - La hora de fin en formato HH:mm.
 * @returns Un objeto con las partes de la hora de inicio y fin.
 */
export function timeInPieces(startTime: string, endTime: string) {
  const startTimeParts = startTime.split(':')
  const endTimeParts = endTime.split(':')

  // Paso a números
  const startHour = parseInt(startTimeParts[0], 10)
  const startMinute = parseInt(startTimeParts[1], 10)
  const endHour = parseInt(endTimeParts[0], 10)
  const endMinute = parseInt(endTimeParts[1], 10)

  return { startHour, startMinute, endHour, endMinute }
}

/**
 * Calcula la duración en minutos entre dos tiempos dados.
 * @param startTime - Hora de inicio en formato de cadena (HH:mm).
 * @param endTime - Hora de finalización en formato de cadena (HH:mm).
 * @returns La duración en minutos entre las dos horas dadas.
 */
export const calculateDurationInMinutes = (
  startTime: string,
  endTime: string
): number => {
  const { startHour, startMinute, endHour, endMinute } = timeInPieces(
    startTime,
    endTime
  )

  // Diferencia en minutos
  const hoursDifference = endHour - startHour
  const minutesDifference = endMinute - startMinute

  // Duración en minutos
  return hoursDifference * 60 + minutesDifference
}

/**
 * Calcula la diferencia en días entre la fecha actual y una fecha dada.
 * @param date La fecha en formato 'DD-MM-YYYY'.
 * @returns La diferencia en días entre la fecha actual y la fecha dada.
 */
export const differenceBtwNowAndDate = (date: string): number => {
  const now = dayjs()
  const formattedDate = dayjs(date, 'DD-MM-YYYY', 'es')
  const differenceInDays = formattedDate.diff(now, 'day')
  return differenceInDays
}

/**
 * Verifica si ya existe una cita pendiente con el mismo barbero en la misma fecha y si hay superposición en el tiempo.
 * @param startTime La hora de inicio de la cita.
 * @param endTime La hora de finalización de la cita.
 * @param barberId El ID del barbero.
 * @param date La fecha de la cita.
 * @returns Un valor booleano que indica si existe una cita pendiente con el mismo barbero en la misma fecha y si hay superposición en el tiempo.
 */
export const existingAppointments = async (
  startTime: string,
  endTime: string,
  barberId: string,
  date: string
): Promise<boolean> => {
  const appointments = await AppointmentModel.find({
    barberId,
    date,
    status: AppointmentStatus.PENDING
  })

  return appointments.some((existingAppointment) => {
    // Si ya existe una cita con el mismo barbero en la misma fecha, verifica si hay superposición en el tiempo
    return (
      endTime > existingAppointment.startTime &&
      startTime < existingAppointment.endTime
    )
  })
}

export const existingAppointmentsWhenUpdating = async (
  startTime: string,
  endTime: string,
  barberId: ObjectId,
  clientId: string,
  date: string,
  appointmentId: string
): Promise<boolean> => {
  const appointments = await AppointmentModel.find({
    barberId,
    date,
    status: AppointmentStatus.PENDING
  })

  return appointments.some((existingAppointment) => {
    const isSameClient = existingAppointment.clientId.toString() === clientId
    const isOverlap =
      endTime > existingAppointment.startTime &&
      startTime < existingAppointment.endTime
    const isSameId = existingAppointment._id.toString() === appointmentId
    return (
      (isSameClient && isOverlap && !isSameId) ||
      (!isSameClient && isOverlap && !isSameId)
    )
  })
}

/**
 * Obtiene los nombres de los servicios a partir de sus IDs.
 * @param servicesIds - Array de IDs de servicios.
 * @returns Una cadena de texto con los nombres de los servicios separados por un signo de suma.
 * @throws Error si ocurre un error al obtener los nombres de los servicios.
 */
export const getServicesNames = async (servicesIds: string[]) => {
  try {
    const servicesToEmail = await ServiceModel.find({
      _id: { $in: servicesIds }
    })

    const servicesNames = servicesToEmail
      .map((serv: Service) => serv.name)
      .join(' + ')

    return servicesNames
  } catch (error) {
    throw new Error('Error al obtener los nombres de los servicios.')
  }
}
