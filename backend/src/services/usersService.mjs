import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import {
    createInitialUser,
    findUserByUsername,
    hasUsers,
    insertUser,
    listUsers,
    removeUser,
    saveUser,
} from "../repositories/usersRepository.mjs";

const scrypt = promisify(scryptCallback);

// Deriva un hash con una sal aleatoria para no guardar contraseñas en texto plano.
async function hashPassword(password) {
    const salt = randomBytes(16);
    const hash = await scrypt(password, salt, 64);
    return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

async function verifyPassword(password, storedHash) {
    const [saltHex, expectedHashHex, ...extra] = storedHash.split(":");
    if (!saltHex || !expectedHashHex || extra.length > 0 || !/^[a-f\d]+$/i.test(saltHex + expectedHashHex)) {
        return false;
    }

    const expectedHash = Buffer.from(expectedHashHex, "hex");
    const actualHash = await scrypt(password, Buffer.from(saltHex, "hex"), expectedHash.length);
    return timingSafeEqual(expectedHash, actualHash);
}

// Crea el administrador inicial en una base vacía sin sobrescribir cuentas existentes.
export async function initializeUsers() {
    if (await hasUsers()) {
        return;
    }

    const { APP_USERNAME: username, APP_PASSWORD: password } = process.env;
    if (!username?.trim() || !password) {
        throw new Error("Configura APP_USERNAME y APP_PASSWORD para crear el primer administrador.");
    }
    await createInitialUser(username.trim(), await hashPassword(password));
}

// Verifica la contraseña y devuelve únicamente la identidad y el nivel de acceso.
export async function authenticateUser(username, password) {
    const user = await findUserByUsername(username);
    if (!user || !(await verifyPassword(password, user.password_hash))) {
        return null;
    }
    return { id: user.id, username: user.username, accessLevel: user.access_level };
}

export { listUsers };

// Convierte la contraseña a hash antes de pedir al repositorio que guarde la cuenta.
export async function createUser({ username, password, accessLevel }) {
    const passwordHash = await hashPassword(password);
    return insertUser({ username, passwordHash, accessLevel });
}

// Actualiza una cuenta almacenando el nuevo hash, nunca la contraseña original.
export async function updateUser({ id, username, password, accessLevel }) {
    const passwordHash = await hashPassword(password);
    return saveUser({ id, username, passwordHash, accessLevel });
}

export { removeUser };
