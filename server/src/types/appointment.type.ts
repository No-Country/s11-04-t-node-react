import type { Document, ObjectId } from 'mongoose'

export interface Appointment extends Document {
  clientId: ObjectId
  barberId: ObjectId
  services: [ObjectId]
  totalPrice: number
  status: string
  startTime: string
  endTime: string
  date: Date
}

export enum AppointmentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export interface AppointmentResponse {
  success: boolean
  statusCode: number
  msg: string
  appointment?: Appointment,
  durationInMinutes?: number
}

export interface AppointmentBody {
  clientId: ObjectId
  barberId: ObjectId
  services: [ObjectId]
  startTime: string
  endTime: string
  date: Date
}
