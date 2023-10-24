import jwt from 'jsonwebtoken'
import { SECRET_KEY_APP_USE_JWT } from '../config'
import { ERROR_MSGS } from '../constants/errorMsgs'

export const jwtForApp = async (barberId: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const payload = { barberId }
    let expiresIn
    switch (process.env.NODE_ENV) {
      case 'production':
        expiresIn = '30d'
        break
      case 'development':
        expiresIn = '2d'
        break

      default:
        expiresIn = '1d'
        break
    }
    jwt.sign(payload, SECRET_KEY_APP_USE_JWT, { expiresIn }, (error, token) => {
      if (error != null) {
        reject(new Error(ERROR_MSGS.JWT_FOR_APP_ERROR_1))
      } else if (token !== undefined) {
        resolve(token)
      } else {
        reject(new Error(ERROR_MSGS.JWT_FOR_APP_ERROR_2))
      }
    })
  })
}
