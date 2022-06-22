import styles from './Footer.module.css'

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
            <a href="localizacion.html">
               Localizacion
        </a>
            <a href="cookies.html">
               Cookies
        </a>
    </li>
 </div>
    
     

  
    )
}

export default Footer