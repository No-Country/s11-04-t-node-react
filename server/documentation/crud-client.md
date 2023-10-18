# CRUD de Clientes

## Rutas

### Listar todos los clientes

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/client/get-all`
- **Método HTTP**: GET
- **Descripción**: Obtiene una lista de todos los clientes registrados en la base de datos.

### Crear un nuevo cliente

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/client/create`
- **Método HTTP**: POST
- **Descripción**: Crea un nuevo barbero en la base de datos. Debe proporcionar los datos del cliente en el cuerpo de la solicitud

```json
{
  "fullName": "John Wick",
  "phone": "+569xxxxxxxx",
  "email": "john_wick@gmail.com"
}
```

### Actualizar un cliente existente

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/client/modify/:id`
- **Método HTTP**: PUT
- **Descripción**: Actualiza los datos de un cliente existente según su ID. Debe proporcionar los nuevos datos en el cuerpo de la solicitud.

### Eliminar un cliente

- **Ruta**: `https://barberbuddy.fly.dev/api/v1/client/delete/:id`
- **Método HTTP**: DELETE
- **Descripción**: Elimina un cliente de la base de datos según su ID.
