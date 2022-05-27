import { validate } from "jsonschema";
import { newItemsSchema,itemsSchema,deleteItemSchema } from "../schemas/itemsSchemas.mjs";


// Validacion Añadir Items

export function validateNewItemsJSON ( request, response, next) {
    try {
        const validation = validate(request.body,newItemsSchema)
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

// Validacion Añadir Item

export function validateItemsJSON ( request, response, next) {
    try {
        const validation = validate(request.body,itemsSchema)
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

//Validacion Eliminar Item

export function validateDeleteItemJSON ( request, response, next) {
    try {
        const validation = validate(request.body,deleteItemSchema)
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