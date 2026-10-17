import { validate } from "jsonschema";
import { newItemsSchema,itemsSchema,deleteItemSchema } from "../schemas/itemsSchemas.mjs";


// Validacion Añadir Items

export function validateNewItemsJSON ( request, response, next) {
    try {
        if (!request.file) {
            return response.status(400).send("Se requiere una imagen para el artículo.");
        }
        if (request.body.id_item !== undefined) request.body.id_item = Number(request.body.id_item);
        if (request.body.id_seccion !== undefined) request.body.id_seccion = Number(request.body.id_seccion);
        if (request.body.precio !== undefined) request.body.precio = Number(request.body.precio);
        if (request.file) request.body.imagen = request.file.filename;
        const validation = validate(request.body,newItemsSchema)
        if (validation.valid) {
            next();
        } else {
            response.status(400).send("Datos de artículo no válidos.");
        }
    } catch (err) {
        next(err);
    }
}

// Validacion Añadir Item

export function validateItemsJSON ( request, response, next) {
    try {
        const validation = validate(request.body,itemsSchema)
        if (validation.valid) {
            next();
        } else {
            response.status(400).send("Datos de artículo no válidos.");
        }
    } catch (err) {
        next(err);
    }
}

//Validacion Eliminar Item

export function validateDeleteItemJSON ( request, response, next) {
    try {
        const validation = validate(request.body,deleteItemSchema)
        if (validation.valid) {
            next();
        } else {
            response.status(400).send("Datos de artículo no válidos.");
        }
    } catch (err) {
        next(err);
    }
}