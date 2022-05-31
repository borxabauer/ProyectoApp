import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const Item = ()=>{

    const params= useParams()
    console.log('params:',params.id_item)
    const backendURL = "http://localhost:3000/api/v0.0/"

    const [item,setItem] = useState(null)
    const [listItem,setListItem] = useState(null)

    async function fetchItem () {
        const response = await fetch(backendURL+'secciones/'+params.id_item);
        const data = await response.json()
        setItem(data)

        const itemHTML = data.map(
            sec => <li key= {sec.nombre_item}><Link to= {`/items/${sec.id_item}`}>{sec.nombre_item} {sec.precio} {sec.descripcion_item} {sec.image} </Link></li>
        )
        setListItem(itemHTML)
    }


    

    useEffect(
        ()=>{
            fetchItem()
        },
        [params]
    )

    return (
        <>
        <div className= "item">
                <h1> Item </h1>
                 {listItem}   
        </div>
             
      </>
     )
    }



export default Item