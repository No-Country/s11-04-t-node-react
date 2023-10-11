import { Schema, model } from 'mongoose'
import { type Client } from '../types/client.type'

const ClientSchema = new Schema<Client>(
  {
    fullName: {
      type: String,
      required: [true, 'Nombre completo es requerido'],
      min: [4, 'Nombre completo debe tener almenos 4 caracteres.']
    },
    phone: {
      type: String,
      required: [true, 'Teléfono es requerido'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Correo electrónico es requerido'],
      unique: true
    },
    role: {
      type: String,
      default: 'client'
    }
  },

  { timestamps: true }
)

const ClientModel = model('Client', ClientSchema)
export default ClientModel
