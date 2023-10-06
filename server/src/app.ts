import express from 'express'
import router from './routes'
import cors from 'cors'
import morgan from 'morgan'

const app = express()

/* MIDDLEWARES */
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

//   ROUTES
app.use(router)

export default app
