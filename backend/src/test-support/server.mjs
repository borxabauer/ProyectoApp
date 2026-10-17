import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

export async function startTestServer() {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), "proyectoapp-api-"));
    process.env.DATABASE_PATH = path.join(temporaryDirectory, "test.db");
    process.env.UPLOADS_PATH = path.join(temporaryDirectory, "uploads");
    process.env.APP_USERNAME = "test-admin";
    process.env.APP_PASSWORD = "test-password";
    process.env.JWT_SECRET = "test-secret-that-is-at-least-thirty-two-characters";

    const [{ default: app }, { db }] = await Promise.all([
        import("../index.mjs"),
        import("../sqlModels/db.mjs"),
    ]);

    const server = app.listen(0);
    await new Promise((resolve, reject) => {
        server.once("listening", resolve);
        server.once("error", reject);
    });

    return {
        baseUrl: `http://127.0.0.1:${server.address().port}/api/v0.0`,
        db,
        close: async () => {
            await new Promise((resolve, reject) =>
                server.close((error) => error ? reject(error) : resolve())
            );
            await new Promise((resolve, reject) =>
                db.close((error) => error ? reject(error) : resolve())
            );
            await rm(temporaryDirectory, { recursive: true, force: true });
        },
    };
}
