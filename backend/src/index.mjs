import express from "express";
import { getUserController,postUserController,putUserController,deleteUserController } from "./controllers/usersControllers.mjs";
import { getAllProductosControllers,postProductosControllers,putProductosControllers,deleteProductosControllers,getOneProductosControllers } from "./controllers/productosControllers.mjs";
import { getAllItemsControllers,postItemsControllers,putItemsControllers,deleteItemsControllers,getOneItemsControllers,getItemForASeccionIdControllers } from "./controllers/itemsControllers.mjs";
import { getAllSeccionesControllers, postSeccionesControllers,getOneSeccionesControllers,putSeccionesControllers,deleteSeccionesControllers,getSeccionForAProductoIdControllers} from "./controllers/seccionesControllers.mjs"
import { deletePedidosControllers, getAllPedidosControllers, getOnePedidosControllers, postPedidosControllers, putPedidosControllers } from "./controllers/pedidoControllers.mjs";
import { validateDeleteProductoJSON, validateNewProductoJSON, validateProductoJSON } from "./middleware/jsonValidatorProductos.mjs";
import { validateDeleteSeccionJSON, validateNewSeccionJSON, validateSeccionJSON } from "./middleware/jsonValidatorSecciones.mjs";
import { validateDeleteItemJSON, validateItemsJSON, validateNewItemsJSON } from "./middleware/jsonValidatorItems.mjs";
import { validateDeleteUserJSON, validateNewUserJSON, validateUserJSON } from "./middleware/jsonValidatorUsers.mjs";
import { createAccessToken, decodeBasicToken, authMiddleware } from "./middleware/authorization.mjs";
import multer from "multer";
import { authenticateUser, initializeUsers } from "./services/usersService.mjs";
import { databaseReady } from "./sqlModels/db.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const uploadsFolder = process.env.UPLOADS_PATH || path.join(directory, "uploads");
const upload = multer({ dest: uploadsFolder });

// Registra las rutas HTTP, conecta el middleware y expone la aplicación Express.
const app = express();
app.use("/", express.static(path.resolve(directory, "../../frontend/src/build"), { index: "index.html" }));

const developmentOrigins = new Set([
    "http://localhost:3001",
    "http://127.0.0.1:3001",
])

app.use((req, res, next) => {
    const origin = req.get("Origin")

    if (origin && developmentOrigins.has(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin)
        res.setHeader("Vary", "Origin")
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    }

    if (req.method === "OPTIONS") {
        return res.sendStatus(origin && developmentOrigins.has(origin) ? 204 : 403)
    }

    next()
})


app.use(express.json());

app.use("/api/v0.0/public/", express.static(uploadsFolder));

// Valida las credenciales Basic y devuelve un JWT si pertenecen al administrador.
app.get("/api/v0.0/login/", async (req, res) => {
    let credentials;
    try {
        credentials = decodeBasicToken(req);
    } catch {
        return res.sendStatus(401);
    }

    try {
        const [username, password] = credentials;
        const user = await authenticateUser(username, password);
        if (!user) {
            return res.sendStatus(401);
        }
        return res.send(createAccessToken(user.accessLevel));
    } catch (err) {
        console.error("No se pudo autenticar la cuenta.", err);
        return res.sendStatus(500);
    }
});

// Ruta protegida de ejemplo para comprobar que la autenticación funciona.
app.get("/api/v0.0/secretos/", authMiddleware, (req, res) => {
    res.send("autorizado");
});

app.get("/api/v0.0/users/", authMiddleware, getUserController);
app.post("/api/v0.0/users/", authMiddleware, validateNewUserJSON, postUserController);
app.put("/api/v0.0/users/", authMiddleware, validateUserJSON, putUserController);
app.delete("/api/v0.0/users/", authMiddleware, validateDeleteUserJSON, deleteUserController);

app.get("/api/v0.0/productos/:id_producto", getOneProductosControllers);
app.get("/api/v0.0/productos/", getAllProductosControllers);
app.post("/api/v0.0/productos/", authMiddleware, validateNewProductoJSON, postProductosControllers);
app.put("/api/v0.0/productos/", authMiddleware, validateProductoJSON, putProductosControllers);
app.delete("/api/v0.0/productos/", authMiddleware, validateDeleteProductoJSON, deleteProductosControllers);

app.get("/api/v0.0/items/:id_item", getOneItemsControllers);
app.get("/api/v0.0/secciones/:id_seccion/items", getItemForASeccionIdControllers);
app.get("/api/v0.0/items/", getAllItemsControllers);
app.post("/api/v0.0/items/", authMiddleware, upload.single("photo"), validateNewItemsJSON, postItemsControllers);
app.put("/api/v0.0/items/", authMiddleware, validateItemsJSON, putItemsControllers);
app.delete("/api/v0.0/items/", authMiddleware, validateDeleteItemJSON, deleteItemsControllers);

app.get("/api/v0.0/secciones/:id_seccion", getOneSeccionesControllers);
app.get("/api/v0.0/productos/:id_producto/secciones", getSeccionForAProductoIdControllers);
app.get("/api/v0.0/secciones/", getAllSeccionesControllers);
app.post("/api/v0.0/secciones/", authMiddleware, validateNewSeccionJSON, postSeccionesControllers);
app.put("/api/v0.0/secciones/", authMiddleware, validateSeccionJSON, putSeccionesControllers);
app.delete("/api/v0.0/secciones/", authMiddleware, validateDeleteSeccionJSON, deleteSeccionesControllers);

app.get("/api/v0.0/pedidos/:id_pedido", getOnePedidosControllers);
app.get("/api/v0.0/pedidos/", getAllPedidosControllers);
app.post("/api/v0.0/pedidos/", authMiddleware, postPedidosControllers);
app.put("/api/v0.0/pedidos/", authMiddleware, putPedidosControllers);
app.delete("/api/v0.0/pedidos/", authMiddleware, deletePedidosControllers);

const requiredEnvironment = ["JWT_SECRET"];
const missingEnvironment = requiredEnvironment.filter((name) => !process.env[name]);
if (missingEnvironment.length > 0) {
    throw new Error(`Faltan variables de entorno obligatorias: ${missingEnvironment.join(", ")}`);
}
if (process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET debe tener al menos 32 caracteres.");
}
await databaseReady;
await initializeUsers();

// Solo abre el puerto al ejecutar este archivo, no al importarlo desde las pruebas.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
        console.log(`Express running on port ${port}...`);
    });
}

export default app;
 

    















