# CRUD de Citas

## Rutas

### Listar todas las citas

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/appointment/get-all`
- **Método HTTP**: GET
- **Descripción**: obtiene una lista de todas las citas registradas en la base de datos del barbero en sesión.
- **Restriccones**: ruta protegida solo para administradores y barberos.

### Crear una nueva cita

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/appointment/create`
- **Método HTTP**: POST
- **Descripción**: crea una nueva cita en la base de datos. Debe proporcionar los datos de la cita en el cuerpo de la solicitud.
- **Restriccones**: ruta protegida solo para administradores y barberos. Comprobamos que el cliente exista en la BD.
- **Info importante**: validamos que la hora de inicio y fin tengan un formato HH:mm, con formato de 24 horas. Validamos que la hora de culminación sea mayor a la hora de inicio. Calculamos la duración de la cita. Validamos que nos pasen la fecha en un formato válido, en 'DD-MM-YYYY'. No pueden tomar citas con más de 30 días de antelación. Se comprueba que no haya una cita con el mismo barbero en la misma fecha, verifica si hay superposición en el tiempo. Sí o sí, tienen que enviar un arreglo con al menos un servicio. Se consulta en la base de datos, los servicios que nos envían (arreglo de ids de servicios), y se calcula el costo total de la atención.
- **Cuerpo de la solicitud**:

  ```json
  {
    "barberId": "652f1522ce0c88e010aaddb1",
    "clientId": "652f1bf5bcbada72e70a920d",
    "date": "24-10-2023",
    "startTime": "13:00",
    "endTime": "14:00",
    "services": ["6534111cc47207093d89298c", "65341130c47207093d892994"]
  }
  ```

### Modificar una cita existente

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/appointment/modify/:id:/:clientId`
- **Método HTTP**: PUT
- **Descripción**: actualiza los datos de una cita existente según su ID. Debe proporcionar los nuevos datos en el cuerpo de la solicitud.
- **Restriccones**: ruta protegida solo para administradores y barberos.
- **Info importante**: siempre tienen que enviar en el body la fecha de la cita, bien sea la nueva fecha, o la fecha que ya tiene la cita. Si van a modificar la hora de la cita, tiene que pasar en el body, el startTime y el endTime.

### Pasa una cita de completada a pendiente y viceversa

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/appointment/complete/:id`
- **Método HTTP**: PUT
- **Descripción**: completa una cita si está pendiente, o pasa una cita de completada a pendiente, actualizando su estado. Si el precio de los servicios ha cambiado desde la creación de la cita, el precio total se actualizará automáticamente.
- **Restriccones**: ruta protegida solo para administradores y barberos.

### Cancelar una cita

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/appointment/cancel/:id`
- **Método HTTP**: PUT
- **Descripción**: cancela una cita si está pendiente, o pasa una cita a pendiente si está cancelada, actualizando su estado. El id que envía por el params, es el id de la cita a cambiar su estado.
- **Restriccones**: ruta protegida solo para administradores y barberos.

### Obtener todas las citas por un barbero para una fecha específica

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/appointment/appointments-by-date/:date`
- **Método HTTP**: GET
- **Descripción**: obitnene todas las citas del barbero en sesión, para una fecha específica. El date que envía por el params, es la fecha de la cita. Recuerda que la fecha la guardamos en la base de datos como string, con el formato en español, es decir, 01-11-2023 (1ero de noviembre de 2023). Esa ruta te devuelve un arreglo con las citas, si el arreglo es vacío, es porque no hay ninguna cita para esa fecha.
- **Restriccones**: ruta protegida solo para administradores y barberos.
