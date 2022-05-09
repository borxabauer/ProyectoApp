
import db from "../sqlModels/db.mjs";
import { getAllItemsSQL,postItemsSQL,putItemsSQL,deleteItemsSQL } from "../sqlModels/itemsModels.mjs";

 // Mostrar items
export function getAllItemsControllers(request, response){
    db.all (getAllItemsSQL,
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
     
  
  //Añadir items
    export function postItemsControllers (request, response){
      const { id_item,id_seccion,descripcion,precio,nombre_item,imagen } = request.body;
      db.run(postItemsSQL,
         
          [id_item,id_seccion,descripcion,precio,nombre_item,imagen],
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
  //  Modificar items
    export function putProductosControllers(request, response){
      db.run(putItemsSQL,
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
  //  Eliminar items
     export function deleteItemsControllers (request, response){
      db.run(deleteItemsSQL,
       
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