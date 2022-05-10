
import db from "../sqlModels/db.mjs";
import { getAllItemsSQL,postItemsSQL,putItemsSQL,deleteItemsSQL,getOneItemsByIdSQL } from "../sqlModels/itemsModels.mjs";





export function getOneItemsControllers (request, response) {
    try {
        db.get(
            getOneItemsByIdSQL,
            request.params.id_item,
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
      
      db.run(postItemsSQL,
         
          [request.body.id_item,request.body.id_seccion,request.body.descripcion,request.body.precio,request.body.nombre_item,request.body.imagen],
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
    export function putItemsControllers(request, response){
      db.run(putItemsSQL,
        [request.body.nombre_item,request.body.descripcion,request.body.precio,request.body.imagen,request.body.id_seccion, request.body.id_item],
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
        request.body.id_item,
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