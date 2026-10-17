
import { users } from "../sqlModels/usersModels.mjs";

export function getUserController (request, response) {
    response.json(users.map(({ id, username, accessLevel }) => ({ id, username, accessLevel })));
}

export function postUserController (request, response) {
    const { username, password, accessLevel = 0 } = request.body;
    if (typeof username !== "string" || !username.trim() || typeof password !== "string" || !password) {
        return response.sendStatus(400);
    }
    if (users.some((user) => user.username === username)) {
        return response.sendStatus(409);
    }

    const id = Math.max(0, ...users.map((user) => user.id)) + 1;
    users.push({ id, username: username.trim(), password, accessLevel });
    return response.sendStatus(201);
}

export function putUserController (request, response) {
    const { id, username, password, accessLevel } = request.body;
    const user = users.find((item) => item.id === id);
    if (!user) {
        return response.sendStatus(404);
    }
    if (typeof username !== "string" || !username.trim() || typeof password !== "string" || !password) {
        return response.sendStatus(400);
    }
    if (users.some((item) => item.id !== id && item.username === username)) {
        return response.sendStatus(409);
    }

    Object.assign(user, { username: username.trim(), password, accessLevel });
    return response.sendStatus(200);
}

export function deleteUserController (request, response) {
    const index = users.findIndex((user) => user.id === request.body.id);
    if (index === -1) {
        return response.sendStatus(404);
    }
    users.splice(index, 1);
    return response.sendStatus(200);
}