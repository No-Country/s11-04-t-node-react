import type { Document, ObjectId } from 'mongoose'

export interface Appointment extends Document {
  clientId: ObjectId
  barberId: ObjectId
  services: string[]
  totalPrice: number
  status: string
  startTime: string
  endTime: string
  date: string
}

export enum AppointmentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

export interface AppointmentResponse {
  success: boolean
  statusCode: number
  msg: string
  appointment?: Appointment
  durationInMinutes?: number
}

export interface AppointmentBody {
  clientId: string
  barberId: string
  services: string[]
  startTime: string
  endTime: string
  date: string
}

export interface AppointmentsResponse {
  success: boolean
  statusCode: number
  msg: string
  appointments?: Appointment[]
}
