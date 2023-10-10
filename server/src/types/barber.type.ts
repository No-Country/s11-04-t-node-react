import { type ObjectId } from 'mongoose'

/* MODELS TYPES */
export interface Barber {
  fullName: string
  phone: string
  email: string
  role: string
  services: ObjectId[]
}
