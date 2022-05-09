import {users} from "../sqlModels/usersModels.mjs"


function decodeAuthBasic (headerContent) {
    try {
        const [ method, token ] = headerContent.split(" ");
        const tokenString = atob(token);
        const [ username, password ] = tokenString.split(":");
        return { method, username, password }
    } catch (error) {
        throw "Malformed authentication";
    }
}

export function authMiddleware( request, response, next ) {
    try {
        const { method, name, password } = decodeAuthBasic(request.headers.authorization);

        if (method != "Basic") throw "El método de autorización no funciona, usar Basic."
       
        const user = users.find(
            item => item.name === username && item.password === password
        );
        
            (err, data) => {
                if (err) {
                    response.status(500);
                    response.send(err)
                } else if (data) {
                    next();
                } else {
                    throw "Usuario inexistente o contraseña incorrecta"
                }
            }
        
    } catch (err) {
        console.error(err);
        response.sendStatus(401)
        return;
    }
}