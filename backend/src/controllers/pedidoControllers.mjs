import db from "../sqlModels/db.mjs";
import { getOnePedidosSQL,getAllPedidosSQL,postPedidosSQL,putPedidosSQL,deletePedidosSQL } from "../sqlModels/pedidoModels.mjs";



export function getOnePedidosControllers (request,response){
    try {
        db.get(
            getOnePedidosSQL,
            request.params.id_pedido,
            (err,data)=>{
                if (err) throw err
                else if (data) response.json (data)
                else response.sendStatus(404)


            }

            )
          } catch (err) {
            requestError(err,response)
          }
        }

        
  // Mostrar pedido

   export function getAllPedidosControllers(request, response){
    db.all (getAllPedidosSQL,
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
    export function postPedidosControllers (request, response){
      
      db.run(postPedidosSQL,
         
          [request.body.id_pedido,request.body.id_item,request.body.cantidad],
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
    export function putPedidosControllers(request, response){
      db.run(putPedidosSQL,
        [request.body.cantidad,request.body.id_pedido],
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
     export function deletePedidosControllers (request, response){
      db.run(deletePedidosSQL,
        request.body.id_pedido,
       
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