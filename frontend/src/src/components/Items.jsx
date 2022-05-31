import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"



const Items =() => {
    const params= useParams()
    console.log('params:',params,params.id_seccion)
    const backendURL = "http://localhost:3000/api/v0.0/"

    const[items,setItems]= useState(null)
    const[listItems,setListItems]= useState(null)

    async function fetchItems () {
        const response = await fetch(backendURL+'secciones/'+params.id_seccion+'/items');
        const data = await response.json()
        setItems(data)
        const itemsHTML=data.map(
            sec=> <li key= {sec.nombre_item}><Link to ={`/items/${sec.id_item}`}>{sec.image} {sec.nombre_item} {sec.precio}</Link></li>
        )
        setListItems(itemsHTML)
    }

    useEffect(
        ()=>{
            console.log(items);
            fetchItems ()

        },
        [params]
    )

    return(
        <>
        <div className= "items">
            <h1> Items </h1>
            {listItems}
            
            


        </div>        
        
        </>

    )



}




export default Items;