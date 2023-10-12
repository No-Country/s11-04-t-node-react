import type { Document } from 'mongoose'

export interface Service extends Document {
  name: string
  price: number
  duration: number
}

export interface CreateServicesResponse {
  success: boolean
  statusCode: number
  msg: string
  service?: Service
}
