import { validate } from "jsonschema";
import { seccionSchema,newSeccionSchema, deleteSeccionSchema } from "../schemas/seccionesSchemas.mjs";

// Valida los datos de una sección nueva antes de guardarla.
export function validateNewSeccionJSON ( request, response, next) {
    try {
        const validation = validate(request.body,newSeccionSchema)
        if (validation.valid) {
            next();
        } else {
            response.status(400).send("Datos de sección no válidos.");
        }
    } catch (err) {
        next(err);
    }
}

// Valida los campos editables al actualizar una sección.
export function validateSeccionJSON ( request, response, next) {
    try {
        const validation = validate(request.body,seccionSchema)
        if (validation.valid) {
            next();
        } else {
            response.status(400).send("Datos de sección no válidos.");
        }
    } catch (err) {
        next(err);
    }
}

// Comprueba que el id recibido para borrar una sección sea válido.
export function validateDeleteSeccionJSON ( request, response, next) {
    try {
        const validation = validate(request.body,deleteSeccionSchema)
        if (validation.valid) {
            next();
        } else {
            response.status(400).send("Datos de sección no válidos.");
        }
    } catch (err) {
        next(err);
    }
}