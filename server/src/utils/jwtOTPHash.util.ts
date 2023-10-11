import jwt from 'jsonwebtoken'
import { ERROR_MSGS } from '../constants/errorMsgs'

export const jwtOTPHash = async (otpHash: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const payload = { otpHash }
    const secretKey = process.env.SECRET_KEY_OTP_JWT
    console.log('secretKey', secretKey)
    const expiresIn = '10m' // 10 minutos
    if (typeof secretKey === 'string') {
      jwt.sign(payload, secretKey, { expiresIn }, (error, token) => {
        if (error != null) {
          reject(new Error(ERROR_MSGS.JWT_OTP_HASH_ERROR_1))
        } else if (token === undefined) {
          reject(new Error(ERROR_MSGS.JWT_OTP_HASH_ERROR_2))
        } else {
          resolve(token)
        }
      })
    }
  })
}
