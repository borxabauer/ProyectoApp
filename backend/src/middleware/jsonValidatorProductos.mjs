
import { validate } from "jsonschema";
import { newProductoSchema, productoSchema, deleteProductoSchema} from "../schemas/productosSchemas.mjs";

// Rechaza productos nuevos con datos inválidos antes de acceder a la base de datos.
export function validateNewProductoJSON ( request, response, next) {
    try {
        const validation = validate(request.body, newProductoSchema)
        if (validation.valid) {
            next();
        } else {
            response.status(400).send("Datos de producto no válidos.");
        }
    } catch (err) {
        next(err);
    }
}

// Comprueba los campos requeridos para actualizar un producto.
export function validateProductoJSON ( request, response, next) {
    try {
        const validation = validate(request.body,productoSchema)
        if (validation.valid) {
            next();
        } else {
            response.status(400).send("Datos de producto no válidos.");
        }
    } catch (err) {
        next(err);
    }
}

// Comprueba que la petición de borrado incluya un id de producto válido.
export function validateDeleteProductoJSON ( request, response, next) {
    try {
        const validation = validate(request.body,deleteProductoSchema)
        if (validation.valid) {
            next();
        } else {
            response.status(400).send("Datos de producto no válidos.");
        }
    } catch (err) {
        next(err);
    }
}
