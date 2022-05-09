
import { users } from "../sqlModels/usersModels.mjs";

export function getUserController (request, response) {
    response.json(users)
};

export function postUserController (request, response) {
    users.push(request.body);
    response.sendStatus(201)
};



export function putUserController (request, response) {
    const updatedUser = request.body;
    const oldUserIdx = users.findIndex(
        item => item.id === updatedUser.id
    )
    users[oldUserIdx] = updatedUser;
    response.sendStatus(200);
};



export function deleteUserController (request, response) {
    const updatedUser = request.body;
    const oldUserIdx = users.findIndex(
        item => item.id === updatedUser.id
    )
    users.splice(oldUserIdx, 1); 
    response.sendStatus(200)
};