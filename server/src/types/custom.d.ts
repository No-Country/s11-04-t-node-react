import { type AxiosInstance } from 'axios'

declare global {
  namespace Express {
    interface Request {
      instance?: AxiosInstance
      token: string
      role: string
    }
  }
}
