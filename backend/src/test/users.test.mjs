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

test("persiste cuentas, protege las contraseñas y autentica sus cambios", async () => {
    const { baseUrl, db } = server;
    const unauthenticatedUsers = await fetch(`${baseUrl}/users/`);
    assert.equal(unauthenticatedUsers.status, 401);

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

    const { initializeUsers } = await import("../services/usersService.mjs");
    const configuredUsername = process.env.APP_USERNAME;
    const configuredPassword = process.env.APP_PASSWORD;
    delete process.env.APP_USERNAME;
    delete process.env.APP_PASSWORD;
    await initializeUsers();
    process.env.APP_USERNAME = configuredUsername;
    process.env.APP_PASSWORD = configuredPassword;

    const adminStillAuthenticates = await fetch(`${baseUrl}/login/`, {
        headers: {
            Authorization: `Basic ${Buffer.from("test-admin:test-password").toString("base64")}`,
        },
    });
    assert.equal(adminStillAuthenticates.status, 200);

    const usersResponse = await fetch(`${baseUrl}/users/`, { headers: authorization });
    assert.equal(usersResponse.status, 200);
    assert.deepEqual(await usersResponse.json(), [
        { id: 1, username: "test-admin", accessLevel: 0 },
    ]);

    const createUser = await fetch(`${baseUrl}/users/`, {
        method: "POST",
        headers: { ...authorization, "Content-Type": "application/json" },
        body: JSON.stringify({ username: "customer", password: "customer-password" }),
    });
    assert.equal(createUser.status, 201);

    const duplicateUser = await fetch(`${baseUrl}/users/`, {
        method: "POST",
        headers: { ...authorization, "Content-Type": "application/json" },
        body: JSON.stringify({ username: "customer", password: "another-password" }),
    });
    assert.equal(duplicateUser.status, 409);

    const savedUser = await new Promise((resolve, reject) => {
        db.get("SELECT id, password_hash FROM users WHERE username = ?", ["customer"], (err, row) =>
            err ? reject(err) : resolve(row)
        );
    });
    assert.ok(savedUser.password_hash.includes(":"));
    assert.notEqual(savedUser.password_hash, "customer-password");

    const customerLogin = await fetch(`${baseUrl}/login/`, {
        headers: {
            Authorization: `Basic ${Buffer.from("customer:customer-password").toString("base64")}`,
        },
    });
    assert.equal(customerLogin.status, 200);

    const updateUser = await fetch(`${baseUrl}/users/`, {
        method: "PUT",
        headers: { ...authorization, "Content-Type": "application/json" },
        body: JSON.stringify({
            id: savedUser.id,
            username: "customer-updated",
            password: "updated-password",
        }),
    });
    assert.equal(updateUser.status, 200);

    const oldPasswordLogin = await fetch(`${baseUrl}/login/`, {
        headers: {
            Authorization: `Basic ${Buffer.from("customer-updated:customer-password").toString("base64")}`,
        },
    });
    assert.equal(oldPasswordLogin.status, 401);

    const updatedLogin = await fetch(`${baseUrl}/login/`, {
        headers: {
            Authorization: `Basic ${Buffer.from("customer-updated:updated-password").toString("base64")}`,
        },
    });
    assert.equal(updatedLogin.status, 200);

    const deleteUser = await fetch(`${baseUrl}/users/`, {
        method: "DELETE",
        headers: { ...authorization, "Content-Type": "application/json" },
        body: JSON.stringify({ id: savedUser.id }),
    });
    assert.equal(deleteUser.status, 200);

    const deletedLogin = await fetch(`${baseUrl}/login/`, {
        headers: {
            Authorization: `Basic ${Buffer.from("customer-updated:updated-password").toString("base64")}`,
        },
    });
    assert.equal(deletedLogin.status, 401);
});
