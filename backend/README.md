# Backend

El backend es un servicio Express que expone la API de la tienda y guarda sus
datos en SQLite.

## Estructura

- `src/controllers/`: traduce peticiones HTTP a operaciones y respuestas.
- `src/middleware/`: autentica peticiones y valida sus datos.
- `src/repositories/`: contiene las consultas de persistencia de usuarios.
- `src/schemas/`: define la forma permitida de los cuerpos JSON.
- `src/services/`: concentra la lógica de autenticación y las contraseñas.
- `src/sqlModels/`: abre SQLite y declara el esquema de datos.
- `src/test-support/`: utilidades compartidas para levantar servidores de prueba.
- `src/test/`: pruebas de integración de la API.

## Configuración inicial

1. Si `src/.env` no existe, créalo a partir de `src/.env.template`; si ya existe,
   añade las variables indicadas sin sobrescribir las demás.
2. Define `APP_USERNAME` y `APP_PASSWORD` para crear el primer administrador
   cuando la tabla `users` esté vacía.
3. Define `JWT_SECRET` con una clave aleatoria de al menos 32 caracteres.
   Puedes generarla con `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.
4. Inicia el servidor desde `src` con `npm start`.

Las cuentas se guardan en SQLite; las contraseñas se almacenan como hashes con
sal y no se devuelven por la API. Las variables del administrador inicial se
usan únicamente para inicializar una base vacía.

## Pruebas

Desde `src`, ejecuta `npm test`. La prueba de integración crea una base de datos
temporal, comprueba autenticación y CRUD de cuentas, y verifica que productos,
pedidos e imágenes siguen funcionando sin modificar la base de desarrollo.
