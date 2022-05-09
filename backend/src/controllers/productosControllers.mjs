import db from "../sqlModels/db.mjs";
import { deleteProductosSQL, getAllProductosSQL,postProductosSQL, putProductosSQL } from "../sqlModels/productosModels.mjs";
  
  
  // Mostrar productos

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
     
  
  //Añadir tareas
    export function postProductosControllers (request, response){
      const { id_producto, name_producto } = request.body;
      db.run(postProductosSQL,
         
          [id_producto,name_producto],
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
  //  Modificar tarea
    export function putProductosControllers(request, response){
      db.run(putProductosSQL,
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
  //  Eliminar tarea
     export function deleteProductosControllers (request, response){
      db.run(deleteProductosSQL,
       
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