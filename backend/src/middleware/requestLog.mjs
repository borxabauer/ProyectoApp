// Registra solo método y ruta, evitando exponer cuerpos de petición o credenciales.
export function requestLog ( request, response, next ) {
    console.log(request.method, request.originalUrl);
    next();
}