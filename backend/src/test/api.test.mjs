import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import os from "node:os";
import path from "node:path";
import { rm } from "node:fs/promises";

const temporaryDirectory = await import("node:fs/promises").then(({ mkdtemp }) =>
    mkdtemp(path.join(os.tmpdir(), "proyectoapp-api-"))
);
const databasePath = path.join(temporaryDirectory, "test.db");
process.env.DATABASE_PATH = databasePath;
process.env.UPLOADS_PATH = path.join(temporaryDirectory, "uploads");
process.env.APP_USERNAME = "test-admin";
process.env.APP_PASSWORD = "test-password";
process.env.JWT_SECRET = "test-secret-that-is-at-least-thirty-two-characters";

const [{ default: app }, { db }] = await Promise.all([
    import("../index.mjs"),
    import("../sqlModels/db.mjs"),
]);

let server;
let baseUrl;

before(async () => {
    server = app.listen(0);
    await new Promise((resolve, reject) => {
        server.once("listening", resolve);
        server.once("error", reject);
    });
    baseUrl = `http://127.0.0.1:${server.address().port}/api/v0.0`;
});

after(async () => {
    if (server) {
        await new Promise((resolve, reject) =>
            server.close((error) => error ? reject(error) : resolve())
        );
    }
    await new Promise((resolve, reject) =>
        db.close((error) => error ? reject(error) : resolve())
    );
    await rm(temporaryDirectory, { recursive: true, force: true });
});

test("autentica el acceso, protege escrituras y permite operar con productos y pedidos", async () => {
    const unauthenticatedWrite = await fetch(`${baseUrl}/productos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_producto: 101, nombre_producto: "Prueba" }),
    });
    assert.equal(unauthenticatedWrite.status, 401);

    const invalidLogin = await fetch(`${baseUrl}/login/`);
    assert.equal(invalidLogin.status, 401);

    const login = await fetch(`${baseUrl}/login/`, {
        headers: {
            Authorization: `Basic ${Buffer.from("test-admin:test-password").toString("base64")}`,
        },
    });
    assert.equal(login.status, 200);
    const token = await login.text();
    const authorization = { Authorization: `Bearer ${token}` };

    const invalidProduct = await fetch(`${baseUrl}/productos/`, {
        method: "POST",
        headers: { ...authorization, "Content-Type": "application/json" },
        body: JSON.stringify({ id_producto: 102 }),
    });
    assert.equal(invalidProduct.status, 400);

    const unauthorizedUsers = await fetch(`${baseUrl}/users/`);
    assert.equal(unauthorizedUsers.status, 401);

    const usersResponse = await fetch(`${baseUrl}/users/`, { headers: authorization });
    assert.equal(usersResponse.status, 200);
    assert.deepEqual(await usersResponse.json(), [
        { id: 1, username: "test-admin", accessLevel: 0 },
    ]);

    const missingImage = new FormData();
    missingImage.set("id_item", "304");
    missingImage.set("id_seccion", "1");
    missingImage.set("descripcion", "Artículo de prueba");
    missingImage.set("precio", "10");
    missingImage.set("nombre_item", "Silla de prueba");
    const createItemWithoutImage = await fetch(`${baseUrl}/items/`, {
        method: "POST",
        headers: authorization,
        body: missingImage,
    });
    assert.equal(createItemWithoutImage.status, 400);

    const itemForm = new FormData();
    itemForm.set("id_item", "305");
    itemForm.set("id_seccion", "1");
    itemForm.set("descripcion", "Artículo de prueba");
    itemForm.set("precio", "10");
    itemForm.set("nombre_item", "Silla de prueba");
    itemForm.set("photo", new Blob(["test-image-content"], { type: "image/png" }), "test.png");
    const createItem = await fetch(`${baseUrl}/items/`, {
        method: "POST",
        headers: authorization,
        body: itemForm,
    });
    assert.equal(createItem.status, 201);

    const sectionItems = await fetch(`${baseUrl}/secciones/1/items`);
    assert.equal(sectionItems.status, 200);
    const items = await sectionItems.json();
    assert.equal(items.length, 1);
    assert.equal(items[0].nombre_item, "Silla de prueba");

    const uploadedImage = await fetch(`${baseUrl}/public/${items[0].imagen}`);
    assert.equal(uploadedImage.status, 200);
    assert.equal(await uploadedImage.text(), "test-image-content");

    const productBody = { id_producto: 101, nombre_producto: "Mesa de prueba" };
    const createProduct = await fetch(`${baseUrl}/productos/`, {
        method: "POST",
        headers: { ...authorization, "Content-Type": "application/json" },
        body: JSON.stringify(productBody),
    });
    assert.equal(createProduct.status, 201);

    const readProduct = await fetch(`${baseUrl}/productos/101`);
    assert.equal(readProduct.status, 200);
    assert.deepEqual(await readProduct.json(), { nombre_producto: "Mesa de prueba" });

    const createOrder = await fetch(`${baseUrl}/pedidos/`, {
        method: "POST",
        headers: { ...authorization, "Content-Type": "application/json" },
        body: JSON.stringify({ id_pedido: 202, id_item: 303, cantidad: 2 }),
    });
    assert.equal(createOrder.status, 201);

    const readOrder = await fetch(`${baseUrl}/pedidos/202`);
    assert.equal(readOrder.status, 200);
    assert.deepEqual(await readOrder.json(), { id_item: 303, cantidad: 2 });

    const deleteOrder = await fetch(`${baseUrl}/pedidos/`, {
        method: "DELETE",
        headers: { ...authorization, "Content-Type": "application/json" },
        body: JSON.stringify({ id_pedido: 202 }),
    });
    assert.equal(deleteOrder.status, 200);
});
