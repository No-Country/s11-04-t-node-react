import type { Document } from 'mongoose'

export interface Service extends Document {
  name: string
  price: number
  duration: number
}

export interface BodyService {
  name: string
  price: string
  duration: string
}

export interface ServicesResponse {
  success: boolean
  statusCode: number
  msg: string
  service?: Service
}
