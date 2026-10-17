
import { config } from "dotenv";

config();

// Cuenta de administración en memoria, configurada mediante variables de entorno.
export const users = process.env.APP_USERNAME && process.env.APP_PASSWORD
    ? [{
        id: 1,
        username: process.env.APP_USERNAME,
        password: process.env.APP_PASSWORD,
        accessLevel: 0,
    }]
    : [];