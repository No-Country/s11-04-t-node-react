import { Schema, model } from 'mongoose'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { type Client } from '../types/client.type'

const ClientSchema = new Schema<Client>(
  {
    fullName: {
      type: String,
      required: [true, ERROR_MSGS.FULL_NAME_REQUIRED],
      minlength: [4, ERROR_MSGS.FULL_NAME_MIN_LENGTH],
      maxlength: [50, ERROR_MSGS.FULL_NAME_MAX_LENGTH]
    },
    phone: {
      type: String,
      required: [true, ERROR_MSGS.TELEPHONE_REQUIRED],
      unique: true
    },
    email: {
      type: String,
      required: [true, ERROR_MSGS.EMAIL_REQUIRED],
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
