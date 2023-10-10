import { Schema, model } from 'mongoose'
import modelOptions from './modelOptions'
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
      required: [true, 'Teléfono es requerido']
    },
    email: {
      type: String,
      required: [true, 'Correo electrónico es requerido']
    },
    role: {
      type: String,
      required: true
    }
  },
  modelOptions
)

const ClientModel = model('Client', ClientSchema)
export default ClientModel
