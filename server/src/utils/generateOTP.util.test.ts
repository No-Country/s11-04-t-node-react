import { describe, expect, it } from '@jest/globals'
import { generateOTP } from './generateOTP.util'

describe('generateOTP', () => {
  it('debe generar un OTP de 4 dígitos', () => {
    const otp = generateOTP()
    expect(otp).toHaveLength(4)
    expect(parseInt(otp)).toBeGreaterThanOrEqual(0)
    expect(parseInt(otp)).toBeLessThanOrEqual(9999)
  })

  it('debe generar un OTP diferente en cada llamada', () => {
    const otp1 = generateOTP()
    const otp2 = generateOTP()
    expect(otp1).not.toEqual(otp2)
  })
})
