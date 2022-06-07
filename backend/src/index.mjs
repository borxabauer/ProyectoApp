import express from "express";
import { requestLog } from "./middleware/requestLog.mjs";
import { getUserController,postUserController,putUserController,deleteUserController } from "./controllers/usersControllers.mjs";
import { getAllProductosControllers,postProductosControllers,putProductosControllers,deleteProductosControllers,getOneProductosControllers } from "./controllers/productosControllers.mjs";
import { getAllItemsControllers,postItemsControllers,putItemsControllers,deleteItemsControllers,getOneItemsControllers,getItemForASeccionIdControllers } from "./controllers/itemsControllers.mjs";
import { getAllSeccionesControllers, postSeccionesControllers,getOneSeccionesControllers,putSeccionesControllers,deleteSeccionesControllers,getSeccionForAProductoIdControllers} from "./controllers/seccionesControllers.mjs"
import { deletePedidosControllers, getAllPedidosControllers, getOnePedidosControllers, postPedidosControllers, putPedidosControllers } from "./controllers/pedidoControllers.mjs";
import { validateDeleteProductoJSON, validateNewProductoJSON, validateProductoJSON } from "./middleware/jsonValidatorProductos.mjs";
import { validateDeleteSeccionJSON, validateNewSeccionJSON, validateSeccionJSON } from "./middleware/jsonValidatorSecciones.mjs";
import { validateDeleteItemJSON, validateItemsJSON, validateNewItemsJSON } from "./middleware/jsonValidatorItems.mjs";
import multer from "multer";


const app = express();
const PORT = 3000;
//Multer Subir Archivos Carpeta

const UPLOADS_FOLDER= "./uploads/"

const upload=multer({dest: UPLOADS_FOLDER})

app.use(express.json());

try {
    const jsonParser = express.json();
   //app.use(requestLog);
 
     // Imagenes Multer
    /*
 app.post("/api/v0.0/uploadOnePhoto/",upload.single('photo'),(req,res)=>{

    console.log("File:",req.file)
    console.log("Body:",req.body)

    res.sendStatus(201)
 })
 */

 

 app.use("/api/v0.0/public/",express.static(UPLOADS_FOLDER))

 
    
     

     // Usuario
 app.get("/api/v0.0/users/",jsonParser,getUserController);
 app.post("/api/v0.0/users/",jsonParser,postUserController);
 app.put("/api/v0.0/users/",jsonParser,putUserController);
 app.delete("/api/v0.0/users/",jsonParser, deleteUserController);

     // Productos
 app.get("/api/v0.0/productos/:id_producto",jsonParser,getOneProductosControllers);
 app.get("/api/v0.0/productos/",jsonParser,getAllProductosControllers);
 app.post("/api/v0.0/productos/",jsonParser,validateNewProductoJSON,postProductosControllers);
 app.put("/api/v0.0/productos/",jsonParser,validateProductoJSON,putProductosControllers);
 app.delete("/api/v0.0/productos/",jsonParser,validateDeleteProductoJSON,deleteProductosControllers);

    // Items
 app.get("/api/v0.0/items/:id_item",jsonParser,getOneItemsControllers);
 app.get("/api/v0.0/secciones/:id_seccion/items",jsonParser,getItemForASeccionIdControllers)
 app.get("/api/v0.0/items/",jsonParser,getAllItemsControllers);
 app.post("/api/v0.0/items/",upload.single('photo'),postItemsControllers);
 app.put("/api/v0.0/items/",jsonParser,validateItemsJSON,putItemsControllers);
 app.delete("/api/v0.0/items/",jsonParser,validateDeleteItemJSON,deleteItemsControllers);

   // Secciones
 app.get("/api/v0.0/secciones/:id_seccion",jsonParser,getOneSeccionesControllers);
 app.get("/api/v0.0/productos/:id_producto/secciones",jsonParser,getSeccionForAProductoIdControllers);
 app.get("/api/v0.0/secciones/",jsonParser,getAllSeccionesControllers);
 app.post("/api/v0.0/secciones/",jsonParser,validateNewSeccionJSON,postSeccionesControllers);
 app.put("/api/v0.0/secciones/",jsonParser,validateSeccionJSON,putSeccionesControllers);
 app.delete("/api/v0.0/secciones/",jsonParser,validateDeleteSeccionJSON,deleteSeccionesControllers);

 // Pedidos

 app.get("/api/v0.0/pedidos/:id_pedido",jsonParser,getOnePedidosControllers);
 app.get("/api/v0.0/pedidos/",jsonParser,getAllPedidosControllers);
 app.post("/api/v0.0/pedidos/",jsonParser,postPedidosControllers);
 app.put("/api/v0.0/pedidos/",jsonParser,putPedidosControllers);
 app.delete("/api/v0.0/pedidos/",jsonParser,deletePedidosControllers);


 
 

 app.listen(PORT,()=>{
    console.log("Express running...");
})

} catch (err) {
    console.error(err);
}
 

    






















