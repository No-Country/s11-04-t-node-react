import { type ObjectId } from 'mongoose'

/* MODELS TYPES */
export interface Barber {
  fullName: string
  phone: string
  email: string
  role: string
  services: ObjectId[]
}

/* USER RESPONSE TYPE */

export type BarberRequest = Barber
