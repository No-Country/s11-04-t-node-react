## **Verificar email**

Esta ruta sirve para ingresar el OTP que recibieron por email. Les recuerdo que en la ruta `login` le entregamos un token, ese token tiene el OTP con un hash, y lo necesitamos para poder validar que están ingresando el OTP correcto. Deberán pasar por la cabecera de autorización el token que le dimos al hacer `login` con el estándar Bearer Token. Ejemplo:

```javascript
axios.post('https://example.com/endpoint', data, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
```

- **URL**

`/api/v1/verify-email`

- **Método:**

`POST`

- **Cuerpo de la petición**

  ```json
  {
    "otp": "3480"
  }
  ```

- **Respuesta exitosa:**

  - **Código:** 200 <br />
    **Contenido:**
    ```json
    {
      "success": true,
      "msg": "Código verificado correctamente",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYXJiZXJJZCI6IjY1MjVkZmU0ZGY4ZjliZmRiNzU5MmQ2MyIsImlhdCI6MTY5NzExOTc2MiwiZXhwIjoxNjk3MjA2MTYyfQ.UVOfyiNLpDYe6pLSt49-zzHklCiXFgeLb-mkrEyp5gM",
      "fullName": "Juan Admin",
      "role": "admin"
    }
    ```

- **Respuesta de error:** <br />
  Si el token ha expirado

  - **Código:** 400 Bad Request <br />
    **Contenido:**
    ```json
    {
      "success": false,
      "msg": "El token para verificar el OTP ha expirado. Solicite uno nuevo OTP."
    }
    ```

  Si envían un OTP vacío

  - **Código:** 400 Bad Request <br />
    **Contenido:**
    ```json
    {
      "success": false,
      "msg": "La solicitud para verificar el OTP es inválida."
    }
    ```

  Si envían un OTP incorrecto

  - **Código:** 400 Bad Request <br />
    **Contenido:**
    ```json
    {
      "success": false,
      "msg": "El OTP es inválido."
    }
    ```

- **Nota importante:** <br />
  El token que le enviamos en esta oportunidad, tiene una vigencia de 1 día en desarrollo y de 30 días en producción. Ese token tendrá el id del usuario, con eso podremos validar que el rol sea el adecuado y que tenga permiso para usar la app. Este token para usar la app, lo deben enviar al backend en la cabecera de autorización con el estándar Bearer Token, en las rutas para usar la app (CRUD de barberos, CRUD de servicios, CRUD de clientes). RECUERDEN MANEJAR EL CASO CUANDO EL TOKEN EXPIRA, DEBEN SACAR EL USUARIO DE LA APP Y HACER QUE INICIE SESIÓN DE NUEVO.
