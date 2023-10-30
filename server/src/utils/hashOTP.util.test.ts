import { describe, expect, it } from '@jest/globals'
import { compareOTPWithItsHash, generateHashOTP } from './hashOTP.util'

describe('generateHashOTP', () => {
  it('debe generar un hash para un OTP válido', () => {
    const otp = '2371'
    const hashedOTP = generateHashOTP(otp)

    expect(hashedOTP).not.toBe(otp)
  })

  it('debe generar un hash diferente para el mismo OTP', () => {
    const otp = '2371'
    const hashedOTP1 = generateHashOTP(otp)
    const hashedOTP2 = generateHashOTP(otp)

    expect(hashedOTP1).not.toEqual(hashedOTP2)
  })
})

describe('compareOTPWithItsHash', () => {
  it('debe devolver true si el OTP y su hash coinciden', () => {
    const otp = '1842'
    const hashedOTP = generateHashOTP(otp)

    const result = compareOTPWithItsHash(otp, hashedOTP)

    expect(result).toBe(true)
  })

  it('debe devolver false si el OTP y su hash no coinciden', () => {
    const otp = '1810'
    const hashedOTP = generateHashOTP(otp)

    const result = compareOTPWithItsHash('1234', hashedOTP)

    expect(result).toBe(false)
  })
})
