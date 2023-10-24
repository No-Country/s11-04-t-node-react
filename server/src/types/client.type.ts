import type { Document } from 'mongoose'
import type { Appointment } from './appointment.type'

/* MODELS TYPES */
export interface Client extends Document {
  fullName: string
  phone: string
  email: string
  role: string
}

export interface ClientResponse {
  success: boolean
  msg: string
  statusCode: number
  client?: Client
  appointments?: Appointment[]
}

export interface ClientsResponse {
  success: boolean
  msg: string
  statusCode: number
  clients?: Client[]
}
