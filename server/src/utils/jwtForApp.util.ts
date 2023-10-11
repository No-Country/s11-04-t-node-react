import jwt from 'jsonwebtoken'
import { ERROR_MSGS } from '../constants/errorMsgs'

export const jwtForApp = async (barberId: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const payload = { barberId }
    const secretKey = process.env.SECRET_KEY_APP_USE_JWT as string
    const expiresIn = '30d'
    jwt.sign(payload, secretKey, { expiresIn }, (error, token) => {
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
