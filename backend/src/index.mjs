import express from "express";
import { authMiddleware } from "./middleware/authorization.mjs";
import { requestLog } from "./middleware/requestLog.mjs";
import { getUserController,postUserController,putUserController,deleteUserController } from "./controllers/usersControllers.mjs";
import { getProductosControllers,postProductosControllers,putProductosControllers,deleteProductosControllers } from "./controllers/productosControllers.mjs";


const app = express();
const PORT = 3000;



app.use(express.json());

try {
    const jsonParser = express.json();
    app.use(requestLog);

     // Usuario
 app.get("/api/v0.0/users/",jsonParser,getUserController);
 app.post("/api/v0.0/users/",jsonParser,postUserController);
 app.put("/api/v0.0/users/",jsonParser,putUserController);
 app.delete("/api/v0.0/users/",jsonParser, deleteUserController);

     // Productos

 app.get("/api/v0.0/users/",jsonParser,authMiddleware,getProductosControllers);
 app.post("/api/v0.0/users/",jsonParser,authMiddleware, postProductosControllers);
 app.put("/api/v0.0/users/",jsonParser,authMiddleware,putProductosControllers);
 app.delete("/api/v0.0/users/",jsonParser,authMiddleware,deleteProductosControllers);

    






















app.listen(PORT,()=>{
    console.log("Express running...");
})

} catch (err) {
    console.error(err);
}