import db from "../sqlModels/db.mjs";
import { getOnePedidosSQL } from "../sqlModels/pedidoModels.mjs";



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