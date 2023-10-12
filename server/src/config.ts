import 'dotenv/config'

export const PORT = +(process.env.PORT ?? 5000)
export const MONGODB_URL = process.env.MONGODB_URL as string // MONGODB

export const EMAIL_ADDRESS = process.env.ADDRESS_EMAIL as string
export const EMAIL_PASSWORD = process.env.PASSWORD_EMAIL as string
export const SECRET_KEY_OTP_JWT = process.env.SECRET_KEY_OTP_JWT as string
export const SECRET_KEY_APP_USE_JWT = process.env
  .SECRET_KEY_APP_USE_JWT as string
export const LOCAL_DB_URL = process.env.LOCAL_DB_URL as string
export const DEPLOYMENT_DB_URL = process.env.DEPLOYMENT_DB_URL as string
export const FRONTEND_DEV_DB = process.env.FRONTEND_DEV_DB as string
