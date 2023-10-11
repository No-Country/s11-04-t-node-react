import bcrypt from 'bcryptjs'

export const generateHashOTP = (otp: string): string => {
  // Generate a salt with 10 rounds complexity
  const salt = bcrypt.genSaltSync(10)
  // Create a hash of the OTP using the generated salt
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
