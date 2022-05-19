
import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"

function Secciones () {

    const params = useParams()
    console.log('los params :', params, params.seccion)
    const backendURL = "http://localhost:3000/api/v0.0/"

    const [seccion, setSeccion] = useState(null)
    const [items, setItems] = useState([])

    async function fetchSeccion () {
        const response = await fetch(backendURL+'secciones/'+params.seccion);
        const data = await response.json()
        setSeccion(data)
    }

    async function fetchItems () {
        const responseItems = await fetch(backendURL+`items/`+seccion[0]);
         setItems(await responseItems.json())
    }

    useEffect(
        ()=>{
            fetchSeccion()
        },
        []
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
            <h1>Estás en "Secciones"</h1>
            {seccion && <p>{seccion.nombre_seccion}</p>}
        </>
    )
}

export default Secciones