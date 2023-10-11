import { type ObjectId } from 'mongoose'

/* MODELS TYPES */
export interface Barber {
  fullName: string
  phone: string
  email: string
  role: string
  services: ObjectId[]
}

export interface ILoginUser {
  success: boolean
  msg: string
  statusCode: number
  token?: string
}
