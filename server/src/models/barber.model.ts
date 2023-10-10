import { Schema, model } from 'mongoose'
import { type Barber } from '../types/barber.type'

const BarberSchema = new Schema<Barber>(
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
      default: 'barber'
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Service'
      }
    ]
  },

  { timestamps: true }
)

const BarberModel = model('Barber', BarberSchema)
export default BarberModel
