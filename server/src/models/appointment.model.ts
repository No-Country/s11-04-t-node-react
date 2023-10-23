import { Schema, model } from 'mongoose'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { AppointmentStatus, type Appointment } from '../types/appointment.type'

const AppointmentSchema = new Schema<Appointment>({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, ERROR_MSGS.CLIENT_ID_REQUIRED]
  },
  barberId: {
    type: Schema.Types.ObjectId,
    ref: 'Barber',
    required: [true, ERROR_MSGS.BARBER_ID_REQUIRED]
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, ERROR_MSGS.SERVICES_IDS_REQUIRED]
    }
  ],
  totalPrice: {
    type: Number,
    required: [true, ERROR_MSGS.TOTAL_PRICE_REQUIRED]
  },
  status: {
    type: String,
    enum: [AppointmentStatus.PENDING, AppointmentStatus.COMPLETED],
    default: AppointmentStatus.PENDING
  },
  date: {
    type: String,
    required: [true, ERROR_MSGS.DATE_REQUIRED]
  },
  startTime: {
    type: String,
    required: [true, ERROR_MSGS.START_TIME_REQUIRED]
  },
  endTime: {
    type: String,
    required: [true, ERROR_MSGS.END_TIME_REQUIRED]
  }
})

const AppointmentModel = model('appointment', AppointmentSchema)
export default AppointmentModel
