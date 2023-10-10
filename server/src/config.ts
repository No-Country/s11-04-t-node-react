import 'dotenv/config'

export const PORT = +(process.env.PORT ?? 5000)
export const MONGODB_URL = process.env.MONGODB_URL as string // MONGODB
