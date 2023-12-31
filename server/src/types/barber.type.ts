import type { Document, ObjectId } from 'mongoose'
import { Client } from './client.type'

/* MODELS TYPES */
export interface Barber extends Document {
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
  barberId?: string
}

export interface JwtOtpVerificationResponse {
  otpHash: string
  iat: number
  exp: number
}

export interface VerifyOTPProps {
  otp: string
}

export interface IVerifyAuth {
  success: boolean
  msg: string
  statusCode: number
  token?: string
  fullName?: string
  role?: string
  tokenExpired?: boolean
  _id?: string
}

export interface CreateBarberProps {
  fullName: string
  phone: string
  email: string
  services: ObjectId[]
  role: string
}

export interface BarberResponse {
  success: boolean
  msg: string
  statusCode: number
  barber?: Barber
  clients?: Client[]
}
