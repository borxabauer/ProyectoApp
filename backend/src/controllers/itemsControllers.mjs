
import db from "../sqlModels/db.mjs";
import { getAllItemsSQL,postItemsSQL,putItemsSQL,deleteItemsSQL,getOneItemsByIdSQL,getItemForASeccionIdSQL } from "../sqlModels/itemsModels.mjs";



// Busca un artículo por id; responde 404 cuando no hay coincidencias.
export function getOneItemsControllers (request, response) {
    db.get(getOneItemsByIdSQL, request.params.id_item, (err, data) => {
        if (err) {
            console.error(err);
            return response.sendStatus(500);
        }
        return data ? response.json(data) : response.sendStatus(404);
    });
}

// Lista los artículos que pertenecen a la sección solicitada.
export function getItemForASeccionIdControllers (request,response){
    db.all(getItemForASeccionIdSQL, request.params.id_seccion, (err, data) => {
        if (err) {
            console.error(err);
            return response.sendStatus(500);
        }
        return response.json(data);
    });
    }





// Devuelve el catálogo completo de artículos.
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
     
  
  // Guarda el artículo y la imagen que Multer almacenó durante la petición.
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
  // Actualiza los datos de un artículo existente.
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
  // Elimina el artículo indicado por su id.
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