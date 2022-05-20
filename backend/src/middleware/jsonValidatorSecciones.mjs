import { validate } from "jsonschema";
import { seccionSchema,newSeccionSchema, deleteSeccionSchema } from "../schemas/seccionesSchemas.mjs";

 // Validacion Añadir Seccion

export function validateNewSeccionJSON ( request, response, next) {
    try {
        const validation = validate(request.body,newSeccionSchema)
        if (validation.valid) {
            next();
        } else {
            response.status(400);
            response.send("Invalid task data provided");
            console.error("Invalid task data provided");
        }
    } catch (err) {
        throw "Error validating data"
    }
}

// Validacion Añadir Seccion

export function validateSeccionJSON ( request, response, next) {
    try {
        const validation = validate(request.body,seccionSchema)
        if (validation.valid) {
            next();
        } else {
            response.status(400);
            response.send("Invalid task data provided");
            console.error("Invalid task data provided");
        }
    } catch (err) {
        throw "Error validating data"
    }
}

//Validacion Eliminar Productos

export function validateDeleteSeccionJSON ( request, response, next) {
    try {
        const validation = validate(request.body,deleteSeccionSchema)
        if (validation.valid) {
            next();
        } else {
            response.status(400);
            response.send("Invalid task data provided");
            console.error("Invalid task data provided");
        }
    } catch (err) {
        throw "Error validating data"
    }
}