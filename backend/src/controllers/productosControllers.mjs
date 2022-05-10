import db from "../sqlModels/db.mjs";
import { deleteProductosSQL, getAllProductosSQL,postProductosSQL, putProductosSQL,getOneProductosIdSQL } from "../sqlModels/productosModels.mjs";
  
  

export function getOneProductosControllers (request, response) {
    try {
        db.get(
            getOneProductosIdSQL,
            request.params.id_producto,
            (err, data) => {
                if ( err ) throw err
                else if ( data ) response.json(data)
                else response.sendStatus(404)
            }
        )
    } catch (err) {
        requestError(err, response)
    }
}


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
  //  Modificar tarea
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
  //  Eliminar tarea
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