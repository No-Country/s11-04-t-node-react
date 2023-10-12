import { Schema, model } from 'mongoose'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { type Barber } from '../types/barber.type'

const BarberSchema = new Schema<Barber>(
  {
    fullName: {
      type: String,
      required: [true, ERROR_MSGS.FULL_NAME_REQUIRED],
      min: [4, ERROR_MSGS.FULL_NAME_MIN_LENGTH],
      max: [50, ERROR_MSGS.FULL_NAME_MAX_LENGTH],
      trim: true
    },
    phone: {
      type: String,
      required: [true, ERROR_MSGS.TELEPHONE_REQUIRED],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, ERROR_MSGS.EMAIL_REQUIRED],
      unique: true,
      trim: true,
      lowercase: true
    },
    role: {
      type: String,
      default: 'barber',
      enum: ['barber', 'admin']
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
