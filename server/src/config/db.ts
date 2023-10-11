import mongoose from 'mongoose'
import { DEPLOYMENT_DB_URL, FRONTEND_DEV_DB, LOCAL_DB_URL } from '../config'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { SUCCESS_MSGS } from '../constants/successMsgs'
mongoose.set('strictQuery', false)

let dbUrl: string

switch (process.env.NODE_ENV) {
  case 'production':
    dbUrl = DEPLOYMENT_DB_URL
    break
  case 'development':
    dbUrl = LOCAL_DB_URL
    break
  case 'frontend':
    dbUrl = FRONTEND_DEV_DB
    break
}

export async function connectToDb(): Promise<void> {
  try {
    if (dbUrl !== undefined) {
      await mongoose.connect(dbUrl)
    }
    console.log(SUCCESS_MSGS.DB_CONNECTED)
  } catch (error) {
    console.log(ERROR_MSGS.DB_CONNECTION_ERROR, error)
  }
}

connectToDb().catch((err) => {
  console.log(err)
})
