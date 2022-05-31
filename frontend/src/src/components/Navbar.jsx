import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import logo from "../images/logo.jpg";
const NavBar = ()=> {

    const backendURL = "http://localhost:3000/api/v0.0/"

    const [productos, setProductos] = useState([])

    async function fetchProductos () {
        const response = await fetch(backendURL+'productos/');
        const data = await response.json();
        setProductos(data)
    }
    
    useEffect(
        ()=>{
            fetchProductos()
        },
        []
    )

    return(

    <div className ="container">
                 
            <div className ="navbar">
                <div>
                <Link to="./">
                <img src={logo} className="logo" alt="Main Logo"/>
                </Link>
                </div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {productos.map(item=><li><Link to={"/productos/"+item.id_producto}>{item.nombre_producto}</Link></li>)}    
                </ul>  
            </div>
         

     </div>


    )
}

export default NavBar;