import type { Document } from 'mongoose'

export interface Service extends Document {
  name: string
  price: number
}

export interface BodyService {
  name: string
  price: string
}

export interface ServicesResponse {
  success: boolean
  statusCode: number
  msg: string
  service?: Service
}
