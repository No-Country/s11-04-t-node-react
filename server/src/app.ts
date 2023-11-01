import cors from 'cors'
import express, { type Express } from 'express'
import morgan from 'morgan'
import { appoimentRouter } from './routes/appointment.route'
import { barberRouter, loginRouter } from './routes/barber.route'
import { clientRouter } from './routes/client.route'
import { servicesRouter } from './routes/services.route'

const app: Express = express()

/* MIDDLEWARES */
app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://barberbuddyapp.vercel.app'
    ]
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// ROUTES
app.use('/api/v1', loginRouter)
app.use('/api/v1/barber', barberRouter)
app.use('/api/v1/services', servicesRouter)
app.use('/api/v1/client', clientRouter)
app.use('/api/v1/appointment', appoimentRouter)

export default app
