
import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const Secciones =()=> {

    const params = useParams()
    console.log('los params :', params, params.id_producto)
    const backendURL = "http://localhost:3000/api/v0.0/"

    const [seccion, setSeccion] = useState(null)
    const [ seccionList , setSeccionList ] = useState(null)
    

    async function fetchSeccion () {
        const response =await fetch(backendURL+'productos/'+params.id_producto+'/secciones');
        const data = await response.json()
        setSeccion(data)
        const seccionesHTML = data.map(
            sec => <li key= {sec.nombre_seccion}><Link to= {`/secciones/${sec.id_seccion}`}>{sec.nombre_seccion}</Link></li>
        )
        setSeccionList(seccionesHTML)
    }



    useEffect(
        ()=>{
            fetchSeccion()
        },
        [params]
    )

    
     


  

    return (
        <>
        
        < div className = "secciones">
            <h1>Secciones</h1>
            {seccionList}
        
         </div>


        </>
    )
}

export default Secciones

/*
            {params.id_seccion !== 0 && params.id_items === 0 && <Items/> }
            {params.id_seccion !== 0 && params.id_items !== 0 && <Item/>}
 */