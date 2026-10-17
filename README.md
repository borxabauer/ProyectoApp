# Muebles

Aplicación de tienda con frontend React y API Express sobre SQLite.

## Organización

- `frontend/src/`: paquete React; su subcarpeta `src/` contiene páginas,
  componentes, estilos y estado compartido.
- `backend/src/controllers/`: adapta peticiones HTTP a operaciones de la app.
- `backend/src/middleware/`: autenticación y validación de peticiones.
- `backend/src/repositories/`: acceso SQL a los datos de cuentas.
- `backend/src/services/`: reglas de autenticación y protección de contraseñas.
- `backend/src/sqlModels/`: conexión y esquema de SQLite, además de consultas
  SQL del catálogo.
- `backend/src/test/`: pruebas de integración por áreas funcionales.

## Ejecutar

Configura primero las variables descritas en [backend/README.md](./backend/README.md).
Después, desde `backend/src`, ejecuta `npm start`. Para ejecutar las pruebas,
usa `npm test` desde esa misma carpeta; para compilar la interfaz, ejecuta
`npm run build` desde `frontend/src`.
