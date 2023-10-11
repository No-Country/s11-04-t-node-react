import mongoose from 'mongoose'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { SUCCESS_MSGS } from '../constants/successMsgs'
mongoose.set('strictQuery', false)

const LOCAL_DB = process.env.LOCAL_DB_URL
const DEPLOYMENT_DB = process.env.DEPLOYMENT_DB_URL
const dbUrl = process.env.NODE_ENV === 'production' ? DEPLOYMENT_DB : LOCAL_DB

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
