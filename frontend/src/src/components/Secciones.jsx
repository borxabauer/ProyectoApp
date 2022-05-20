
import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

function Secciones () {

    const params = useParams()
    console.log('los params :', params, params.id_producto)
    const backendURL = "http://localhost:3000/api/v0.0/"

    const [seccion, setSeccion] = useState(null)
    const [ seccionList , setSeccionList ] = useState(null)
    const [items, setItems] = useState([])

    async function fetchSeccion () {
        const response = await fetch(backendURL+'productos/'+params.id_producto+'/secciones');
        const data = await response.json()
        setSeccion(data)
        const seccionesHTML = data.map(
            sec => <li key= {sec.nombre_seccion}><Link to= {`/secciones/${sec.nombre_seccion}`}>{sec.nombre_seccion}</Link></li>
        )
        setSeccionList(seccionesHTML)
    }

    async function fetchItems () {
        const responseItems = await fetch(backendURL+`items/`+seccion[0]);
         setItems(await responseItems.json())
    }

    useEffect(
        ()=>{
            fetchSeccion()
        },
        [params]
    )

    useEffect(
        ()=>{
            console.log(seccion);
            fetchItems()
        },
        [seccion]
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