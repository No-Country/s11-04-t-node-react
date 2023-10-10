import { Twilio } from 'twilio'

const accountSid = 'ACc0c2c6c57a77c55282f2690882ecbdbb'
const authToken = '8da8dfc27b6ace45ee1b8a7dd0985da8'
const twilioNumber = '+1 334 458 8829'

export const sendSms = async (
  otp: string,
  userNumber: string
): Promise<void> => {
  if (accountSid && authToken && userNumber && twilioNumber) {
    const client = new Twilio(accountSid, authToken)

    try {
      const message = await client.messages.create({
        from: twilioNumber,
        to: userNumber,
        body: `Ingrese este número ${otp} para usar la aplicación.`
      })

      console.log(message.sid)
    } catch (error) {
      console.error('Error sending SMS:', error)
    }
  } else {
    console.error(
      'You are missing one of the variables you need to send a message'
    )
  }
}
