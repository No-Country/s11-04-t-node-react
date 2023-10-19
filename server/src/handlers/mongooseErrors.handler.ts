export const mongooseValidatonErrorHandler = (err: any): string => {
  const errors = Object.values(err.errors).map((val: any) => val.message)
  const errorMsgs = errors.join('. ')
  const msg = `Datos inválidos: ${errorMsgs}`
  return msg
}

export const duplicateKeyErrorHandler = (err: any): string => {
  const errors = Object.values(err.keyValue).map(
    (val: any) => `El campo ${val} ya existe`
  )
  const errorMsgs = errors.join('. ')
  const msg = `Datos repetidos: ${errorMsgs}`
  return msg
}
