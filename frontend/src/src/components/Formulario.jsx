
const Formulario =()=>{





function handleSubmit (event){
    event.preventDefault()
    const formData = new FormData(event.target)
    fetch(
        "http://localhost:3000/api/v0.0/uploadOnePhoto/"
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
               <input type="text"  name="description"/>
               <input type="number"  name="precio"/>
               <input type="file"  name="photo"/>
               <input type="submit"  name="Enviar"/>
        
       </form>

     </> 
)

}

export default Formulario
