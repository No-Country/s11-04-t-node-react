import jwt from 'jsonwebtoken'
import { SECRET_KEY_OTP_JWT } from '../config'
import { ERROR_MSGS } from '../constants/errorMsgs'

export const jwtOTPHash = async (
  otpHash: string,
  barberId: string
): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const payload = { otpHash, barberId }
    const expiresIn = '10m' // 10 minutos
    if (typeof SECRET_KEY_OTP_JWT === 'string') {
      jwt.sign(payload, SECRET_KEY_OTP_JWT, { expiresIn }, (error, token) => {
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
