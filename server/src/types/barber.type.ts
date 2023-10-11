import type { Document, ObjectId } from 'mongoose'

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

export interface IVerifyOTP {
  success: boolean
  msg: string
  statusCode: number
  token?: string
  fullName?: string
  role?: string
}
