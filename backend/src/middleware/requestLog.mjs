import { users } from "../sqlModels/usersModels.mjs";
import { items } from "../sqlModels/itemsModels.mjs";
import { productos } from "../sqlModels/productosModels.mjs";
import { secciones } from "../sqlModels/seccionesModels.mjs";

export function requestLog ( request, response, next ) {
    next();
    const { url, method, body } = request
    console.log( method, url, body );
    console.log("Users:", users);
    console.log("Items:", items);
    console.log("Productos:", productos);
    console.log("Secciones:", secciones);
}