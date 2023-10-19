import { Schema, model } from 'mongoose'
import type { Appointment } from '../types/appointment.type'

const AppointmentSchema = new Schema<Appointment>({
  client: { type: String, required: true },
  barber: { type: String, required: true },
  services: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String }
})

const AppointmentModel = model('appointment', AppointmentSchema)
export default AppointmentModel
