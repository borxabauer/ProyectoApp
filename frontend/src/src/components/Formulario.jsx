/*
const Formulario =()=>{






function handleSubmit (event){
    event.preventDefault()
    const formData = new FormData(event.target)
    fetch(
        "http://localhost:3000/api/v0.0/items/"
       ,
        {
            method: "POST",
            body:formData
        }
    )
}

return (
    <>
    <form  onSubmit={handleSubmit} className ="formPhoto">
            <h2> Upload one Photo</h2>
               <input type="number"  name="id_item"/>
               <input type="number"  name="id_seccion"/>
               <input type="text"  name="descripcion"/>
               <input type="number"  name="precio"/>
               <input type="text"  name="nombre_item"/>
               <input type="file"  name="photo"/>
               <input type="submit"  name="enviar"/>
        
       </form>

     </> 
)

}

export default Formulario

*/