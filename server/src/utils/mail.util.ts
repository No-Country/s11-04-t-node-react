import nodemailer from 'nodemailer'
import { EMAIL_ADDRESS, EMAIL_PASSWORD } from '../config'
import { generateSendOTPTemplate } from './sendOTPEmailTemplate'

export const sendEmail = async (receiverMail: string, otpcode: string) => {
  const sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD
    }
  })

  const mail = {
    from: EMAIL_ADDRESS,
    to: receiverMail,
    subject: 'Usar este codigo para iniciar sesion en BarberBuddy',
    html: generateSendOTPTemplate(otpcode)
  }

  try {
    const res = await sender.sendMail(mail)
    console.log(res.response)
  } catch (error) {
    console.log(error)
  }
}
