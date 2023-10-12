import mongoose from 'mongoose'
import { DEPLOYMENT_DB_URL, FRONTEND_DEV_DB, LOCAL_DB_URL } from '../config'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { SUCCESS_MSGS } from '../constants/successMsgs'
mongoose.set('strictQuery', false)

export async function connectToDb(): Promise<void> {
  try {
    const dbUrl =
      process.env.NODE_ENV === 'production'
        ? DEPLOYMENT_DB_URL
        : process.env.NODE_ENV === 'development'
        ? LOCAL_DB_URL
        : FRONTEND_DEV_DB

    if (dbUrl !== undefined) {
      const db = await mongoose.connect(dbUrl)
      console.log(SUCCESS_MSGS.DB_CONNECTED)
      console.log(`Connected to collection: ${db.connection.name}`)
    } else {
      console.log('El string de conexion esta vacio.')
    }
  } catch (error) {
    console.log(ERROR_MSGS.DB_CONNECTION_ERROR, error)
  }
}

connectToDb().catch((err) => {
  console.log(err)
})
