import cors from 'cors'
import express, { type Express } from 'express'
import morgan from 'morgan'
import { barberRouter, loginRouter } from './routes/barber.route'
import { servicesRouter } from './routes/services.route'

const app: Express = express()

/* MIDDLEWARES */
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// ROUTES
app.use('/api/v1', loginRouter)
app.use('/api/v1/barber', barberRouter)
app.use('/api/v1/services', servicesRouter)

export default app
