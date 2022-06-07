import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import CardItem from "./CardItem"



const Items =() => {
    const params= useParams()
    console.log('params:',params,params.id_seccion)
    const backendURL = "http://localhost:3000/api/v0.0/"

    const[items,setItems]= useState([])
    const[listItems,setListItems]= useState([])

    async function fetchItems () {
        const response = await fetch(backendURL+'secciones/'+params.id_seccion+'/items');
        const data = await response.json()
        setItems(data)
    }

    useEffect(
        ()=>{
            console.log(items);
            fetchItems ()

        },
        [params]
    )

    useEffect(
        ()=>{
            const itemsHTML=items.map(
                item => {return <CardItem item={item}/>}
               
            )
            setListItems(itemsHTML)
        },
        [items]
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

