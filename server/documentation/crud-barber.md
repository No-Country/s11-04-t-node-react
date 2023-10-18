# CRUD de Barberos

## Rutas

### Listar todos los barberos

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/barber/get-barbers`
- **Método HTTP**: GET
- **Descripción**: Obtiene una lista de todos los barberos registrados en la base de datos.
- **Restriccones**: ruta protegida solo para admins.

### Listar tel barbero en sesión

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/barber/get-me/:id`
- **Método HTTP**: GET
- **Descripción**: Obtiene la información del babero que ha iniciado sesión.
- **Restriccones**: ruta protegida solo para el barbero que ha iniciado la sesión.

### Obtener un barbero por ID

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/barber/get-barber/:id`
- **Método HTTP**: GET
- **Descripción**: Obtiene los detalles de un barbero específico según su ID.
- **Restriccones**: ruta protegida solo para admins.

### Crear un nuevo barbero

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/barber/create`
- **Método HTTP**: POST
- **Descripción**: Crea un nuevo barbero en la base de datos. Debe proporcionar los datos del barbero en el cuerpo de la solicitud.
- **Restriccones**: ruta protegida solo para admins.

### Actualizar un barbero existente

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/barber/modify/:id`
- **Método HTTP**: PUT
- **Descripción**: Actualiza los datos de un barbero existente según su ID. Debe proporcionar los nuevos datos en el cuerpo de la solicitud.
- **Restriccones**: ruta protegida solo para admins.

### Modificar el barbero que está en sesión

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/barber/modify-me/:id`
- **Método HTTP**: PUT
- **Descripción**: Actualiza los datos de un barbero existente según su ID. Debe proporcionar los nuevos datos en el cuerpo de la solicitud.
- **Restriccones**: ruta protegida solo para el barbero que ha iniciado la sesión.

### Eliminar un barbero

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/barber/delete/:id`
- **Método HTTP**: DELETE
- **Descripción**: Elimina un barbero de la base de datos según su ID.
- **Restriccones**: ruta protegida solo para admins.

### Listas todos los barberos con sus respectivos servicios

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/barber/barbers-with-services`
- **Método HTTP**: GET
- **Descripción**: Obtiene una lista de todos los barberos con el detalle de sus servicios.
- **Restriccones**: ruta protegida solo para admins.
