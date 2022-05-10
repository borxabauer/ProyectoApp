import express from "express";
import { requestLog } from "./middleware/requestLog.mjs";
import { getUserController,postUserController,putUserController,deleteUserController } from "./controllers/usersControllers.mjs";
import { getAllProductosControllers,postProductosControllers,putProductosControllers,deleteProductosControllers,getOneProductosControllers } from "./controllers/productosControllers.mjs";
import { getAllItemsControllers,postItemsControllers,putItemsControllers,deleteItemsControllers,getOneItemsControllers } from "./controllers/itemsControllers.mjs";
import { getAllSeccionesControllers, postSeccionesControllers,getOneSeccionesControllers,putSeccionesControllers,deleteSeccionesControllers} from "./controllers/seccionesControllers.mjs"

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
 app.get("/api/v0.0/productos/:id_producto",jsonParser,getOneProductosControllers)
 app.get("/api/v0.0/productos/",jsonParser,getAllProductosControllers);
 app.post("/api/v0.0/productos/",jsonParser,postProductosControllers);
 app.put("/api/v0.0/productos/",jsonParser,putProductosControllers);
 app.delete("/api/v0.0/productos/",jsonParser,deleteProductosControllers);

    // Items
 app.get("/api/v0.0/items/:id_item",jsonParser,getOneItemsControllers)
 app.get("/api/v0.0/items/",jsonParser,getAllItemsControllers);
 app.post("/api/v0.0/items/",jsonParser,postItemsControllers);
 app.put("/api/v0.0/items/",jsonParser,putItemsControllers);
 app.delete("/api/v0.0/items/",jsonParser,deleteItemsControllers);

   // Secciones
 app.get("/api/v0.0/secciones/:id_seccion",jsonParser,getOneSeccionesControllers)
 app.get("/api/v0.0/secciones/",jsonParser,getAllSeccionesControllers);
 app.post("/api/v0.0/secciones/",jsonParser,postSeccionesControllers);
 app.put("/api/v0.0/secciones/",jsonParser,putSeccionesControllers);
 app.delete("/api/v0.0/secciones/",jsonParser,deleteSeccionesControllers);


 
 

 app.listen(PORT,()=>{
    console.log("Express running...");
})

} catch (err) {
    console.error(err);
}
 
    






















