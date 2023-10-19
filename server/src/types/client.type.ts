import type { Document } from 'mongoose'

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
}

export interface ClientsResponse {
  success: boolean
  msg: string
  statusCode: number
  clients?: Client[]
}
