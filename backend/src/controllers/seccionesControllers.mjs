import db from "../sqlModels/db.mjs";
import { deleteSeccionesSQL, getAllSeccionesSQL,postSeccionesSQL,putSeccionesSQL,getOneSeccionesIdSQL,getSeccionForAProductoIdSQL } from "../sqlModels/seccionesModels.mjs";


export function getOneSeccionesControllers (request, response) {
    try {
        db.get(
            getOneSeccionesIdSQL,
            request.params.id_seccion,
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

// Controlador que la seccion con el producto

export function getSeccionForAProductoIdControllers (request,response){
    try{
        console.log('request.params',request.params)
        db.all(
            getSeccionForAProductoIdSQL,
            request.params.id_producto,
            (err,data)=>{
                if (err) throw err
                else if (data) response.json(data)
                else response.sendStatus(404)

                 }
              )
    }  catch (err) {
        requestError(err, response)
    }
}



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
  // Funcion Modificar tarea
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
  // Funcion Eliminar tarea
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