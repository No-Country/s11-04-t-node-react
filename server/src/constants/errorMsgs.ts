export enum ERROR_MSGS {
  DB_CONNECTION_ERROR = 'Error al conectar con la base de datos 😭😭😭',
  USER_NOT_FOUND = 'El usuario no se ha encontrado.',
  JWT_OTP_HASH_ERROR_1 = 'Error al generar el token para el OTP',
  JWT_OTP_HASH_ERROR_2 = 'El token del OTP Hash es undefined',
  EMAIL_INVALID = 'El correo electrónico tiene formato inválido',
  LOGIN_ERROR = 'Error al intentar hacer login del usuario',
  VERIFY_OTP_INVALID_REQUEST = 'La solicitud para verificar el OTP es inválida',
  VERIFY_OTP_INVALID_USER_ID = 'El ID del usuario es inválido',
  VERIFY_OTP_INVALID_OTP = 'El OTP es inválido',
  JWT_FOR_APP_ERROR_1 = 'Error al generar el token para la app',
  JWT_FOR_APP_ERROR_2 = 'El token para la app es undefined',
  VERIFY_OTP_ERROR = 'Error al intentar verificar el código OTP',
  VERIFY_OTP_TOKEN_EXPIRED = 'El token para verificar el OTP ha expirado. Solicite uno nuevo OTP.',
  VERIFY_OTP_USER_NOT_FOUND = 'El usuario no se ha encontrado',
  SERVER_ERROR = 'SERVER_ERROR',
  UNAUTHORIZED = 'No tiene permiso para acceder a esta funcionalidad.'
}
