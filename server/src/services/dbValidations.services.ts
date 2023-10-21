import type { ObjectId } from 'mongoose'
import BarberModel from '../models/barber.model'
import ClientModel from '../models/client.model'
import ServiceModel from '../models/service.model'

export const isServiceValid = async (serviceId: ObjectId) => {
  try {
    const service = await ServiceModel.findById(serviceId)
    return service !== null
  } catch (error) {
    return false
  }
}

export const isClientValid = async (clientId: ObjectId) => {
  try {
    const client = await ClientModel.findById(clientId)
    return client !== null
  } catch (error) {
    return false
  }
}

export const isBarberValid = async (barberId: ObjectId) => {
  try {
    const barber = await BarberModel.findById(barberId)
    return barber !== null
  } catch (error) {
    return false
  }
}

export const getServicePrice = async (serviceId: ObjectId) => {
  try {
    // Buscar el servicio en la base de datos
    const service = await ServiceModel.findById(serviceId)

    if (!service) {
      return 0 // Si no se encontró el servicio, devolvemos 0 como precio
    }
    return service.price
  } catch (error) {
    return 0
  }
}
