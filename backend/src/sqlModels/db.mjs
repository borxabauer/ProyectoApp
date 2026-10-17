import { config } from 'dotenv';
import sqlite3 from 'sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

config();

const directory = path.dirname(fileURLToPath(import.meta.url));
const databasePath = process.env.DATABASE_PATH || path.join(directory, '..', 'Muebles.db');

// Abre la base de datos persistente; DATABASE_PATH permite usar otra ubicación en pruebas.
export const db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
        console.error('No se pudo abrir la base de datos.', err);
        return;
    }
    console.log('Connected to database.');
});

const schemaStatements = [
    `CREATE TABLE IF NOT EXISTS productos (
        id_producto INTEGER PRIMARY KEY,
        nombre_producto TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS secciones (
        id_seccion INTEGER PRIMARY KEY,
        nombre_seccion TEXT NOT NULL,
        id_producto INTEGER
    )`,
    `CREATE TABLE IF NOT EXISTS items (
        id_item INTEGER PRIMARY KEY,
        id_seccion INTEGER NOT NULL,
        descripcion VARCHAR(200) NOT NULL,
        precio INTEGER(10),
        nombre_item VARCHAR(45) NOT NULL,
        imagen STRING
    )`,
    `CREATE TABLE IF NOT EXISTS cliente (
        id_item INTEGER PRIMARY KEY,
        documento_identificacion INTEGER(8) NOT NULL,
        nombre_cliente VARCHAR(30) NOT NULL,
        primer_apellido VARCHAR(30) NOT NULL,
        segundo_apellido VARCHAR(30) NOT NULL,
        metodo_pago
    )`,
    `CREATE TABLE IF NOT EXISTS pedido (
        id_pedido INTEGER PRIMARY KEY,
        id_item INTEGER(8) NOT NULL,
        cantidad INTEGER(10) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS factura (
        id_pedido INTEGER PRIMARY KEY,
        documento_identificacion INTEGER(8) NOT NULL,
        id_factura INTEGER(8) NOT NULL,
        fecha_factura DATE
    )`,
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        access_level INTEGER NOT NULL DEFAULT 0
    )`,
];

// Aplica el esquema en orden y permite al servidor esperar a que todas las tablas estén listas.
export const databaseReady = schemaStatements.reduce(
    (pending, statement) => pending.then(() => new Promise((resolve, reject) => {
        db.run(statement, (err) => err ? reject(err) : resolve());
    })),
    Promise.resolve(),
);

export default db;