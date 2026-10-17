import db from "../sqlModels/db.mjs";
import { deleteSeccionesSQL, getAllSeccionesSQL,postSeccionesSQL,putSeccionesSQL,getOneSeccionesIdSQL,getSeccionForAProductoIdSQL } from "../sqlModels/seccionesModels.mjs";

// Busca una sección por su id.
export function getOneSeccionesControllers (request, response) {
    db.get(getOneSeccionesIdSQL, request.params.id_seccion, (err, data) => {
        if (err) {
            console.error(err);
            return response.sendStatus(500);
        }
        return data ? response.json(data) : response.sendStatus(404);
    });
}

// Lista las secciones asociadas al producto indicado.
export function getSeccionForAProductoIdControllers (request,response){
    db.all(getSeccionForAProductoIdSQL, request.params.id_producto, (err, data) => {
        if (err) {
            console.error(err);
            return response.sendStatus(500);
        }
        return response.json(data);
    });
}



// Devuelve todas las secciones disponibles.
export function getAllSeccionesControllers(request, response){
    db.all ( getAllSeccionesSQL,
    
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
     
  
  // Crea una sección y la vincula con el producto recibido.
    export function postSeccionesControllers (request, response){
          db.run( postSeccionesSQL,
         
          [request.body.id_seccion, request.body.nombre_seccion,request.body.id_producto],
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
  // Actualiza el nombre de una sección existente.
    export function putSeccionesControllers(request, response){
      db.run(putSeccionesSQL,
        [request.body.nombre_seccion,request.body.id_seccion],
       
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
  // Elimina la sección identificada en la petición.
     export function deleteSeccionesControllers (request, response){
      db.run(deleteSeccionesSQL,
      request.body.id_seccion,
        
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