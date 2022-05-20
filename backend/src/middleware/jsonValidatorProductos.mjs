
import { validate } from "jsonschema";
import { newProductoSchema, productoSchema, deleteProductoSchema} from "../schemas/productosSchemas.mjs";

// Validacion Añadir Productos

export function validateNewProductoJSON ( request, response, next) {
    try {
        const validation = validate(request.body, newProductoSchema)
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

// Validacion Añadir Productos

export function validateProductoJSON ( request, response, next) {
    try {
        const validation = validate(request.body,productoSchema)
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

export function validateDeleteProductoJSON ( request, response, next) {
    try {
        const validation = validate(request.body,deleteProductoSchema)
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

