import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { startTestServer } from "../test-support/server.mjs";

let server;

before(async () => {
    server = await startTestServer();
});

after(async () => {
    await server?.close();
});

test("protege las escrituras y conserva productos, pedidos e imágenes", async () => {
    const { baseUrl } = server;
    const unauthenticatedWrite = await fetch(`${baseUrl}/productos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_producto: 101, nombre_producto: "Prueba" }),
    });
    assert.equal(unauthenticatedWrite.status, 401);

    const login = await fetch(`${baseUrl}/login/`, {
        headers: {
            Authorization: `Basic ${Buffer.from("test-admin:test-password").toString("base64")}`,
        },
    });
    const authorization = { Authorization: `Bearer ${await login.text()}` };

    const invalidProduct = await fetch(`${baseUrl}/productos/`, {
        method: "POST",
        headers: { ...authorization, "Content-Type": "application/json" },
        body: JSON.stringify({ id_producto: 102 }),
    });
    assert.equal(invalidProduct.status, 400);

    const createProduct = await fetch(`${baseUrl}/productos/`, {
        method: "POST",
        headers: { ...authorization, "Content-Type": "application/json" },
        body: JSON.stringify({ id_producto: 101, nombre_producto: "Mesa de prueba" }),
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
});
