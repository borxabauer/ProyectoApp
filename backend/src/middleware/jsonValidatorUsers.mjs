import { validate } from "jsonschema";
import { deleteUserSchema, updateUserSchema, userSchema } from "../schemas/usersSchemas.mjs";

function validateUserRequest(schema, request, response, next) {
    try {
        const result = validate(request.body, schema);
        if (!result.valid) {
            return response.status(400).send("Datos de usuario no válidos.");
        }
        return next();
    } catch (err) {
        return next(err);
    }
}

// Valida los datos recibidos al crear una cuenta.
export function validateNewUserJSON(request, response, next) {
    return validateUserRequest(userSchema, request, response, next);
}

// Valida los datos requeridos para actualizar una cuenta existente.
export function validateUserJSON(request, response, next) {
    return validateUserRequest(updateUserSchema, request, response, next);
}

// Valida el identificador antes de eliminar una cuenta.
export function validateDeleteUserJSON(request, response, next) {
    return validateUserRequest(deleteUserSchema, request, response, next);
}