export enum ERROR_MSGS {
  DB_CONNECTION_ERROR = 'Error al conectar con la base de datos 😭😭😭',
  USER_NOT_FOUND = 'El usuario no se ha encontrado.',
  JWT_OTP_HASH_ERROR_1 = 'Error al generar el token para el OTP.',
  JWT_OTP_HASH_ERROR_2 = 'El token del OTP Hash es undefined.',
  EMAIL_INVALID = 'El correo electrónico tiene un formato inválido.',
  LOGIN_ERROR = 'Error al intentar hacer login del usuario.',
  VERIFY_OTP_INVALID_REQUEST = 'La solicitud para verificar el OTP es inválida.',
  VERIFY_OTP_INVALID_USER_ID = 'El ID del usuario es inválido.',
  VERIFY_OTP_INVALID_OTP = 'El OTP es inválido.',
  JWT_FOR_APP_ERROR_1 = 'Error al generar el token para la app.',
  JWT_FOR_APP_ERROR_2 = 'El token para la app es undefined.',
  VERIFY_OTP_ERROR = 'Error al intentar verificar el código OTP.',
  VERIFY_OTP_TOKEN_EXPIRED = 'El token para verificar el OTP ha expirado. Solicite uno nuevo OTP.',
  SERVER_ERROR = 'SERVER_ERROR.',
  UNAUTHORIZED = 'No tiene permiso para acceder a esta funcionalidad.',
  USER_ALREADY_EXISTS = 'El usuario ya existe.',
  BARBER_CREATION_ERROR = 'Error al intentar crear el barbero.',
  FULL_NAME_REQUIRED = 'Nombre completo es requerido.',
  FULL_NAME_MIN_LENGTH = 'Nombre completo debe tener almenos 4 caracteres.',
  FULL_NAME_MAX_LENGTH = 'Nombre completo debe tener máximo 50 caracteres.',
  TELEPHONE_REQUIRED = 'El teléfono es requerido.',
  EMAIL_REQUIRED = 'El correo electrónico es requerido.',
  BARBERID_INVALID = 'El id del barbero es inválido.',
  APPOIMENTID_INVALID = 'El id de la cita es inválida',
  SERVICE_NAME_REQUIRED = 'El nombre del servicio es requerido.',
  SERVICE_NAME_MIN_LENGTH = 'El nombre del servicio debe tener almenos 4 caracteres.',
  SERVICE_NAME_MAX_LENGTH = 'El nombre del servicio debe tener máximo 50 caracteres.',
  SERVICE_PRICE_REQUIRED = 'El precio del servicio es requerido.',
  TOKEN_APP_EXPIRED = 'El token para usar la app ha expirado. Inicie sesión nuevamente.',
  SERVICE_EXISTS = 'El servicio ya existe.',
  VERIFY_OTP_USER_NOT_FOUND = 'Usuario de autenticación no encontrado.',
  SERVICEID_INVALID = 'El id del servicio es inválido',
  TOKEN_APP_NOT_FOUND = 'El token para usar la app no se ha encontrado.',
  INVALID_NUMERIC_VALUES = 'Se deben recibir valores numéricos válidos.',
  SERVICE_CREATION_ERROR = 'Error al intentar crear el servicio.',
  CLIENTID_INVALID = 'EL id del client es inválido.',
  CLIENT_ALREADY_EXISTS = 'El cliente ya existe.',
  CLIENT_CREATION_ERROR = 'Error al intentar crear el cliente.'
}
