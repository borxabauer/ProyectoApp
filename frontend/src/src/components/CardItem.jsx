import '../styles/card.css'

function CardItem (props) {

const{ item } = props;


   return (
    //<Link to= {`/items/${item.id_item}`}> {item.nombre_item} {item.image} {item.precio} {item.descripcion}>
       <div className= "containerCard" >

            <div className= "nombreItem">
                <h2 > {item.nombre_item} </h2>
            </div>  
                <img src= {"http://localhost:3000/api/v0.0/public/"+item.imagen}  alt="photos"   className="imagenItem"/>

                 <h3 className="precio"> {item.precio} </h3>

            <div className="descripcion">
                 <p > {item.descripcion} </p>
            </div>
                 <button> Añadir Carrito</button>

       </div>
    //</Link>
   )


   }

export default CardItem 

//EL item es el props que utilizo en el componente items 