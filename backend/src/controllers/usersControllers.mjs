
import {
    createUser,
    listUsers,
    removeUser,
    updateUser,
} from "../services/usersService.mjs";

function isValidUserInput({ username, password, accessLevel = 0 }) {
    return typeof username === "string"
        && username.trim().length > 0
        && typeof password === "string"
        && password.length > 0
        && Number.isInteger(accessLevel)
        && accessLevel >= 0;
}

// Devuelve las cuentas sin incluir sus contraseñas.
export async function getUserController (request, response) {
    try {
        return response.json(await listUsers());
    } catch (err) {
        console.error("No se pudieron consultar las cuentas.", err);
        return response.sendStatus(500);
    }
}

// Valida y guarda una cuenta; SQLite impide que se repitan los nombres.
export async function postUserController (request, response) {
    const user = { ...request.body, accessLevel: request.body.accessLevel ?? 0 };
    if (!isValidUserInput(user)) {
        return response.sendStatus(400);
    }
    try {
        await createUser({ ...user, username: user.username.trim() });
        return response.sendStatus(201);
    } catch (err) {
        if (err.code === "SQLITE_CONSTRAINT") {
            return response.sendStatus(409);
        }
        console.error("No se pudo crear la cuenta.", err);
        return response.sendStatus(500);
    }
}

// Valida y actualiza una cuenta existente, incluyendo el hash de la contraseña.
export async function putUserController (request, response) {
    const user = { ...request.body, accessLevel: request.body.accessLevel ?? 0 };
    if (!Number.isInteger(user.id) || user.id < 1 || !isValidUserInput(user)) {
        return response.sendStatus(400);
    }
    try {
        const result = await updateUser({ ...user, username: user.username.trim() });
        return result.changes ? response.sendStatus(200) : response.sendStatus(404);
    } catch (err) {
        if (err.code === "SQLITE_CONSTRAINT") {
            return response.sendStatus(409);
        }
        console.error("No se pudo actualizar la cuenta.", err);
        return response.sendStatus(500);
    }
}

// Elimina de SQLite la cuenta identificada en el cuerpo de la petición.
export async function deleteUserController (request, response) {
    if (!Number.isInteger(request.body.id) || request.body.id < 1) {
        return response.sendStatus(400);
    }
    try {
        const result = await removeUser(request.body.id);
        return result.changes ? response.sendStatus(200) : response.sendStatus(404);
    } catch (err) {
        console.error("No se pudo eliminar la cuenta.", err);
        return response.sendStatus(500);
    }
}