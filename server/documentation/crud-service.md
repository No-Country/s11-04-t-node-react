# BarberBuddy API - Servicios

A continuación se detallan las rutas relacionadas con la gestión de servicios en la API BarberBuddy.

## Crear un Servicio

- **Ruta**: `POST /api/v1/services/create`
- **Descripción**: Crea un nuevo servicio de barbería.
- **Cuerpo de la solicitud**:
  ```json
  {
      "name": "Secado",
      "duration": "30",
      "price": "2000"
  }
  ```

-   **Autenticación**: Bearer Token (`{{token-production-general}}`)
-   **Respuestas**:

## Eliminar un Servicio

-   **Ruta**: `DELETE /api/v1/services/delete/{serviceId}`
-   **Descripción**: Elimina un servicio de barbería existente.
-   **Autenticación**: Bearer Token (`{{token-production-general}}`)
-   **Respuestas**:
- 200 (OK):
```json
{
	"success":  true,
	"msg":  "Servicio borrado correctamente"
}
```
- 400 (BAD REQUEST):
 ```json
{
	"success":  false,
	"msg":  "El id del servicio es inválido"
}
```

## Obtener un Servicio

-   **Ruta**: `GET /api/v1/services/get-service/{serviceId}`
-   **Descripción**: Obtiene información detallada sobre un servicio de barbería.
-   **Autenticación**: Bearer Token (`{{token-production-general}}`)
-   **Respuestas:**
-  200 (OK): 
```json
{
	"success":  true,
	"msg":  "Servicio obtenido correctamente",
	"service":  {
	"_id":  "65285a7a519d0a5e0aa420f7",
	"duration":  30,
	"name":  "alto rapado",
	"price":  300,
	"updatedAt":  "2023-10-12T22:01:46.451Z"
}
```

## Modificar un Servicio

-   **Ruta**: `PUT /api/v1/services/modify/{serviceId}`
-   **Descripción**: Modifica los detalles de un servicio de barbería.
-   **Cuerpo de la solicitud**:
    
   ``` json
   {
        "name": "alto rapado"
   }
```
-   **Autenticación**: Bearer Token (`{{token-production-general}}`)
-   **Respuestas**:
- 200 (OK):
```json
{
	"success":  true,
	"msg":  "Servicio modificado correctamente"
}
``` 
- 400(BAD REQUEST):
``` json
{
	"success":  false,
	"msg":  "El id del servicio es inválido"
}
```
    

