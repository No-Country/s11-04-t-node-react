## **Login**

Esta ruta sirve para solicitar el OTP de un usuario ya registrado. Solo deben ingresar un email y recibirán el código OTP en el email ingresado.

- **URL**

`/api/v1/login`

- **Método:**

`POST`

- **Cuerpo de la petición**

  ```json
  {
    "email": "juancgalue@icloud.com"
  }
  ```

- **Respuesta exitosa:**

  - **Código:** 200 <br />
    **Contenido:**
    ```json
    {
      "success": true,
      "msg": "El código para usar la app fue enviado correctamente",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJvdHBIYXNoIjoiJDJhJDEwJEg5SC9BOWtFMWlwS1NWVWR4UUlaQmUzSGl5Ym44S3dFeFNBN2NsVURBallwUDN1NFlLOVVlIiwiYmFyYmVySWQiOiI2NTI3NGY5YmU5MGZhM2FlNWQxZTE3NzAiLCJpYXQiOjE2OTcwNzcyMjgsImV4cCI6MTY5NzA3NzgyOH0.rioB6JZJ5hZbRpFx-0_0gv3DDfR74B8bAAEM5GVU-cI"
    }
    ```

- **Respuesta de error:** <br />
  Si el usuario no existe

  - **Código:** 404 Not Found <br />
    **Contenido:**
    ```json
    {
      "success": false,
      "msg": "El usuario no se ha encontrado."
    }
    ```

  Si el correo tiene un formato incorrecto

  - **Código:** 400 Bad Request <br />
    **Contenido:**
    ```json
    {
      "success": false,
      "msg": "El correo electrónico tiene formato inválido."
    }
    ```

- **Nota importante:** <br />
  El token que le enviamos tiene una vigencia de 10 minutos.
