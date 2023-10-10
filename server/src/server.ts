import app from './app'
import './config/db'
import { PORT } from './config'

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}...`)
})

process.on('SIGINT', () => {
  console.log('Shutting down the server...')
  server.close(() => {
    console.log('Server has been shut down.')
    process.exit(0)
  })
})
