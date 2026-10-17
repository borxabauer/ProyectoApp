import styles from './Card.module.css'
import { useCart } from "../context/CartContext";
import { backendURL } from "../config.js";

// Muestra un artículo del catálogo y permite añadirlo al carrito.
function CardItem (props) {

const{ item } = props;
const { addToCart } = useCart();


   return (
    //<Link to= {`/items/${item.id_item}`}> {item.nombre_item} {item.image} {item.precio} {item.descripcion}>
       <div className= {styles.card} >

            <img src={`${backendURL}public/${item.imagen}`} className={styles.imagen} alt={item.nombre_item} />

            <div className= {styles.nombreItem}>
                <h2 > {item.nombre_item} </h2>
            </div>  
                

          <h3 className={styles.precio}> {item.precio} </h3>

            <div className={styles.descripcion}>
                 <p > {item.descripcion} </p>
            </div>
                 <button
                    className={styles.button}
                    type="button"
                    onClick={() => addToCart(item)}
                 >
                    Añadir al carrito
                 </button>

       </div>
    //</Link>
   )


   }

export default CardItem 

//EL item es el props que utilizo en el componente items 