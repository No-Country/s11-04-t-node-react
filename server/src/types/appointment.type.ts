import type { Document, ObjectId } from 'mongoose'

export interface Appointment extends Document {
  client: ObjectId
  barber: ObjectId
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
