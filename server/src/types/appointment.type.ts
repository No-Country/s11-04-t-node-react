export interface Appointment extends Document {
  client: string
  barber: string
  services: string
  totalPrice: number
  status: string
}
