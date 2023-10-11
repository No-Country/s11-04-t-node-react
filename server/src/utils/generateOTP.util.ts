export const generateOTP = (): string => {
  let otp = ''
  for (let i = 0; i <= 3; i++) {
    const randomValue = Math.round(Math.random() * 9)
    otp += randomValue.toString()
  }
  return otp
}
