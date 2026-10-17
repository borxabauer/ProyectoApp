import db from "../sqlModels/db.mjs";
import { deleteProductosSQL, getAllProductosSQL,postProductosSQL, putProductosSQL,getOneProductosIdSQL } from "../sqlModels/productosModels.mjs";
// Busca un producto por su id; responde 404 si no existe.
export function getOneProductosControllers (request, response) {
    db.get(getOneProductosIdSQL, request.params.id_producto, (err, data) => {
        if (err) {
            console.error(err);
            return response.sendStatus(500);
        }
        return data ? response.json(data) : response.sendStatus(404);
    });
}


// Devuelve todos los productos para mostrarlos en la tienda.
   export function getAllProductosControllers(request, response){
    db.all (getAllProductosSQL,
    (err, data) => {
        if (err) {
            console.error(err);
            response.sendStatus(500)
        } else {
            response.json(data)
        }
    }
  )
  }
     
  
  // Guarda un producto nuevo con los datos validados del cuerpo.
    export function postProductosControllers (request, response){
      
      db.run(postProductosSQL,
         
          [request.body.id_producto,request.body.nombre_producto],
          (err) => {
              if (err) {
                  console.error(err);
                  response.sendStatus(500)
              } else {
                  response.sendStatus(201)
              }
          }
      )
  }
  // Cambia el nombre del producto indicado por su id.
    export function putProductosControllers(request, response){
      db.run(putProductosSQL,
        [request.body.nombre_producto,request.body.id_producto],
           (err) => {
            if (err) {
                console.error(err);
                response.sendStatus(500)
            } else {
                response.sendStatus(200)
            }
        }
    )
  }
  // Elimina el producto indicado por su id.
     export function deleteProductosControllers (request, response){
      db.run(deleteProductosSQL,
        request.body.id_producto,
       
        (err) => {
            if (err) {
                console.error(err);
                response.sendStatus(500)
            } else {
                response.sendStatus(200)
            }
        }
    )
  }