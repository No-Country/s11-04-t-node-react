import mongoose from 'mongoose'
import { DEPLOYMENT_DB_URL, LOCAL_DB_URL } from '../config'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { SUCCESS_MSGS } from '../constants/successMsgs'
mongoose.set('strictQuery', false)

const dbUrl =
  process.env.NODE_ENV === 'production' ? DEPLOYMENT_DB_URL : LOCAL_DB_URL

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
