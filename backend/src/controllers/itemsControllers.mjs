
import db from "../sqlModels/db.mjs";
import { getAllItemsSQL,postItemsSQL,putItemsSQL,deleteItemsSQL,getOneItemsByIdSQL,getItemForASeccionIdSQL } from "../sqlModels/itemsModels.mjs";



// Mostra un item por id

export function getOneItemsControllers (request, response) {
    db.get(getOneItemsByIdSQL, request.params.id_item, (err, data) => {
        if (err) {
            console.error(err);
            return response.sendStatus(500);
        }
        return data ? response.json(data) : response.sendStatus(404);
    });
}

export function getItemForASeccionIdControllers (request,response){
    db.all(getItemForASeccionIdSQL, request.params.id_seccion, (err, data) => {
        if (err) {
            console.error(err);
            return response.sendStatus(500);
        }
        return response.json(data);
    });
    }





 // Mostrar todos items
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
         
            [request.body.id_item,request.body.id_seccion,request.body.descripcion,request.body.precio,request.body.nombre_item,request.file.filename],
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