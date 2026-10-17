import db, { databaseReady } from "../sqlModels/db.mjs";

function run(sql, parameters = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, parameters, function onComplete(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve({ id: this.lastID, changes: this.changes });
        });
    });
}

function get(sql, parameters = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, parameters, (err, row) => err ? reject(err) : resolve(row));
    });
}

function all(sql, parameters = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, parameters, (err, rows) => err ? reject(err) : resolve(rows));
    });
}

// Busca la fila de una cuenta por su nombre para comprobar las credenciales.
export async function findUserByUsername(username) {
    await databaseReady;
    return get(
        "SELECT id, username, password_hash, access_level FROM users WHERE username = ?",
        [username],
    );
}

// Indica si la base ya tiene cuentas, para no exigir variables de bootstrap en cada reinicio.
export async function hasUsers() {
    await databaseReady;
    return Boolean(await get("SELECT id FROM users LIMIT 1"));
}

// Devuelve los campos públicos de las cuentas, sin hashes de contraseña.
export async function listUsers() {
    await databaseReady;
    const rows = await all("SELECT id, username, access_level FROM users ORDER BY id");
    return rows.map(({ id, username, access_level }) => ({
        id,
        username,
        accessLevel: access_level,
    }));
}

// Crea la cuenta inicial solo si la tabla está vacía.
export async function createInitialUser(username, passwordHash) {
    await databaseReady;
    const existingUser = await get("SELECT id FROM users LIMIT 1");
    if (existingUser) {
        return false;
    }
    await run(
        "INSERT INTO users (username, password_hash, access_level) VALUES (?, ?, ?)",
        [username, passwordHash, 0],
    );
    return true;
}

// Inserta los datos de una cuenta; la contraseña debe llegar ya convertida en hash.
export async function insertUser({ username, passwordHash, accessLevel }) {
    await databaseReady;
    return run(
        "INSERT INTO users (username, password_hash, access_level) VALUES (?, ?, ?)",
        [username, passwordHash, accessLevel],
    );
}

// Actualiza una cuenta y su hash de contraseña.
export async function saveUser({ id, username, passwordHash, accessLevel }) {
    await databaseReady;
    return run(
        `UPDATE users
         SET username = ?, password_hash = ?, access_level = ?
         WHERE id = ?`,
        [username, passwordHash, accessLevel, id],
    );
}

// Elimina una cuenta y devuelve el número de filas afectadas.
export async function removeUser(id) {
    await databaseReady;
    return run("DELETE FROM users WHERE id = ?", [id]);
}
