import bcrypt from 'bcryptjs'

export const generateHashOTP = (otp: string): string => {
  // Genera una sal con 10 rondas de complejidad
  const salt = bcrypt.genSaltSync(10)
  // Crea un hash del otp con la sal generada
  const hash = bcrypt.hashSync(otp, salt)
  otp = hash
  return otp
}

export const compareOTPWithItsHash = (
  input: string,
  otpHash: string
): boolean => {
  return bcrypt.compareSync(input, otpHash)
}
