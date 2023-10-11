import 'dotenv/config'

export const PORT = +(process.env.PORT ?? 5000)
export const MONGODB_URL = process.env.MONGODB_URL as string // MONGODB

export const EMAIL_ADDRESS = process.env.ADDRESS_EMAIL as string
export const EMAIL_PASSWORD = process.env.PASSWORD_EMAIL as string
