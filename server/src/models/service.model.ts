import { Schema, model } from 'mongoose'
import { ERROR_MSGS } from '../constants/errorMsgs'
import type { Service } from '../types/service.type'

const ServiceSchema = new Schema<Service>(
  {
    name: {
      type: String,
      required: [true, ERROR_MSGS.SERVICE_NAME_REQUIRED],
      minlength: [4, ERROR_MSGS.SERVICE_NAME_MIN_LENGTH],
      maxlength: [50, ERROR_MSGS.SERVICE_NAME_MAX_LENGTH],
      unique: true,
      trim: true,
      lowercase: true
    },
    price: {
      type: Number,
      required: [true, ERROR_MSGS.SERVICE_PRICE_REQUIRED],
      trim: true
    },
    duration: {
      type: Number,
      required: [true, ERROR_MSGS.SERVICE_DURATION_REQUIRED],
      trim: true,
      validate: {
        validator: (value: number) => /^\d{2}$/.test(value.toString()),
        message: ERROR_MSGS.SERVICE_DURATION_INVALID
      }
    }
  },
  { timestamps: true }
)

const ServiceModel = model('Service', ServiceSchema)
export default ServiceModel
