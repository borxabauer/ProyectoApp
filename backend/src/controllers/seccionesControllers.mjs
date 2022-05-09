import db from "../sqlModels/db.mjs";
import { deleteSeccionesSQL, getAllSeccionesSQL,postSeccionesSQL,putSeccionesSQL } from "../sqlModels/seccionesModels.mjs";


//Mostrar secciones

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
     
  
  //Añadir tareas
    export function postSeccionesControllers (request, response){
      const { id_seccion, name_seccion, } = request.body;
      db.run( postSeccionesSQL,
         
          [id_seccion, name_seccion],
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
  // Funcion Modificar tarea
    export function putSeccionesControllers(request, response){
      db.run(putSeccionesSQL,
       
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
  // Funcion Eliminar tarea
     export function deleteProductosControllers (request, response){
      db.run(deleteSeccionesSQL,
        
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