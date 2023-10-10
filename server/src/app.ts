import express, { type Express } from 'express'
import router from './routes'
import cors from 'cors'
import morgan from 'morgan'

const app: Express = express()

/* MIDDLEWARES */
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

//   ROUTES
app.use(router)

export default app
