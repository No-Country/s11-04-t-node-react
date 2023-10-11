import type { Document } from 'mongoose'

/* MODELS TYPES */
export interface Client extends Document {
  fullName: string
  phone: string
  email: string
  role: string
}
