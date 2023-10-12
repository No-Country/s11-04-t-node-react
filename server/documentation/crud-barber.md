# CRUD de Barberos

## Rutas

### Listar todos los barberos

- **Ruta**: `https://barberbuddy.vercel.app/api/v1/barber/get-barbers`
- **Método HTTP**: GET
- **Descripción**: Obtiene una lista de todos los barberos registrados en la base de datos.

### Obtener un barbero por ID

- **Ruta**: `https://barberbuddy.vercel.app/api/v1/barber/get-barber/:id`
- **Método HTTP**: GET
- **Descripción**: Obtiene los detalles de un barbero específico según su ID.

### Crear un nuevo barbero

- **Ruta**: `https://barberbuddy.vercel.app/api/v1/barber/create`
- **Método HTTP**: POST
- **Descripción**: Crea un nuevo barbero en la base de datos. Debe proporcionar los datos del barbero en el cuerpo de la solicitud.

### Actualizar un barbero existente

- **Ruta**: `https://barberbuddy.vercel.app/api/v1/barber/modify/:id`
- **Método HTTP**: PUT
- **Descripción**: Actualiza los datos de un barbero existente según su ID. Debe proporcionar los nuevos datos en el cuerpo de la solicitud.

### Eliminar un barbero

- **Ruta**: `https://barberbuddy.vercel.app/api/v1/barber/delete/:id`
- **Método HTTP**: DELETE
- **Descripción**: Elimina un barbero de la base de datos según su ID.
