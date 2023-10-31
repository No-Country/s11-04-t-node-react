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
  SERVER_ERROR = 'Error del servidor.',
  UNAUTHORIZED = 'No tiene permiso para acceder a esta funcionalidad.',
  USER_ALREADY_EXISTS = 'El usuario ya existe.',
  BARBER_CREATION_ERROR = 'Error al intentar crear el barbero.',
  FULL_NAME_REQUIRED = 'Nombre completo es requerido.',
  FULL_NAME_MIN_LENGTH = 'Nombre completo debe tener almenos 4 caracteres.',
  FULL_NAME_MAX_LENGTH = 'Nombre completo debe tener máximo 50 caracteres.',
  TELEPHONE_REQUIRED = 'El teléfono es requerido.',
  EMAIL_REQUIRED = 'El correo electrónico es requerido.',
  BARBERID_INVALID = 'El id del barbero es inválido.',
  BARBER_ID_REQUIRED = 'El id del barbero es requerido.',
  APPOIMENTID_INVALID = 'El id de la cita es inválida',
  SERVICE_NAME_REQUIRED = 'El nombre del servicio es requerido.',
  SERVICE_NAME_MIN_LENGTH = 'El nombre del servicio debe tener almenos 4 caracteres.',
  SERVICE_NAME_MAX_LENGTH = 'El nombre del servicio debe tener máximo 50 caracteres.',
  SERVICE_PRICE_REQUIRED = 'El precio del servicio es requerido.',
  SERVICES_IDS_REQUIRED = 'Los ids de los servicios son requeridos.',
  TOKEN_APP_EXPIRED = 'El token para usar la app ha expirado. Inicie sesión nuevamente.',
  SERVICE_EXISTS = 'El servicio ya existe.',
  VERIFY_OTP_USER_NOT_FOUND = 'Usuario de autenticación no encontrado.',
  SERVICEID_INVALID = 'El id del servicio es inválido',
  TOKEN_APP_NOT_FOUND = 'El token para usar la app no se ha encontrado.',
  INVALID_NUMERIC_VALUES = 'Se deben recibir valores numéricos válidos.',
  SERVICE_CREATION_ERROR = 'Error al intentar crear el servicio.',
  CLIENTID_INVALID = 'EL id del client es inválido.',
  CLIENT_ALREADY_EXISTS = 'El cliente ya existe.',
  CLIENT_CREATION_ERROR = 'Error al intentar crear el cliente.',
  CLIENT_ID_REQUIRED = 'El id del cliente es requerido.',
  TOTAL_PRICE_REQUIRED = 'El precio total es requerido.',
  START_TIME_REQUIRED = 'La hora de inicio es requerida.',
  STAR_TIME_AND_END_TIME_REQUIRED = 'La hora de inicio y finalización son requeridas.',
  END_TIME_REQUIRED = 'La hora de finalización es requerida.',
  DATE_REQUIRED = 'La fecha del servicio es requerida.',
  DATE_INVALID = 'La fecha del servicio no puede ser menor a la actual.',
  TIME_FORMAT_INVALID = 'El formato de la hora es inválido.',
  DATE_INVALID_FORMAT = 'El formato de la fecha es inválido.',
  APPOINTMENT_ALREADY_EXISTS_IN_THAT_TIME = 'Existe ya una cita en este lapso de tiempo para este barbero.',
  TIME_INVALID = 'Los tiempos de inicio y finalización de la cita son inválidos.',
  APPOINTMENT_NOT_PENDING = 'La cita no está pendiente.',
  APPOINTMENT_NOT_PENDING_OR_COMPLETED = 'La cita no está pendiente o completada.',
  CALCULATE_SERVICES_TOTAL_PRICE_ERROR = 'Los servicios no se encontraron o no tienen precio.',
  DATE_TOO_FAR = 'La fecha de la cita no puede ser mayor a 30 días de la actual.',
  BARBER_WITHOUT_CLIENTS = 'El barbero no tiene citas completadas con ningun cliente',
  CLIENT_WITHOUT_APPOINTMENTS = 'Cliente sin citas',
  CLIENT_NOT_FOUND = 'Cliente no encontrado',
  APPOINTMENTS_NOT_FOUND = 'Citas no encontradas',
  TIME_LENGTH_INVALID = 'El tiempo ingresado debe tener 5 caracteres: HH:mm',
  APPOINTMENTS_UNAUTHORIZED = 'No tiene permiso para modificar citas que usted no creó.',
  APPOINTMENT_NOT_PENDING_OR_CANCELED = "La cita no esta pendiente o cancelada"
}
