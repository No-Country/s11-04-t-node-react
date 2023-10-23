import nodemailer from 'nodemailer'
import { EMAIL_ADDRESS, EMAIL_PASSWORD } from '../config'

export const sendEmail = async (
  receiverMail: string,
  content: string,
  emailSubject: string
) => {
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
    subject: emailSubject,
    html: content
  }

  try {
    const res = await sender.sendMail(mail)
    console.log(res.response)
  } catch (error) {
    console.log(error)
  }
}
