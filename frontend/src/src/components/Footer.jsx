import styles from './Footer.module.css'
import { Link } from "react-router-dom";

// Pie de página compartido por las pantallas de la aplicación.
const Footer =()=>{

    return(

 < div className= {styles.footer}>
    <li>
            <a href="about.html">  
               Sobre Nosotros
             </a>
            <a href="contacto.html">
               Contacto
        </a>
            <Link to="/localizacion">
               Localizacion
            </Link>
            <a href="cookies.html">
               Cookies
        </a>
    </li>
 </div>
    
     

  
    )
}

export default Footer