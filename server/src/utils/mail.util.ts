import nodemailer from 'nodemailer'

import { EMAIL_ADRESS, EMAIL_PASSWORD } from '../config'

export const sendEmail = async (receiverMail: string, otpcode: string) => {
  const sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_ADRESS,
      pass: EMAIL_PASSWORD
    }
  })

  const mail = {
    from: 'conivetmailsender@gmail.com',
    to: receiverMail,
    subject: 'No contestar, codigo QR de su mascota',
    text: `Le enviamos el codigo de inicio de sesion en BurberBuddy: "${otpcode}"`
  }

  try {
    const res = await sender.sendMail(mail)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
