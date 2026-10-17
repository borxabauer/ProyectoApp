
import { config } from "dotenv";

config();

export const users = process.env.APP_USERNAME && process.env.APP_PASSWORD
    ? [{
        id: 1,
        username: process.env.APP_USERNAME,
        password: process.env.APP_PASSWORD,
        accessLevel: 0,
    }]
    : [];