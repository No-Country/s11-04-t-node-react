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
- **Info importante**: si va a modificar la hora de la cita, tiene que pasar en el body, el startTime y el endTime.

### Eliminar una cita

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/appointment/delete/:id`
- **Método HTTP**: DELETE
- **Descripción**: elimina una cita de la base de datos según su ID.
- **Restriccones**: ruta protegida solo para administradores y barberos.

### Completar una cita

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/appointment/complete/:id`
- **Método HTTP**: PUT
- **Descripción**: completa una cita, actualizando su estado. Si el precio de los servicios ha cambiado desde la creación de la cita, el precio total se actualizará automáticamente.
- **Restriccones**: Ruta protegida solo para administradores y barberos.
