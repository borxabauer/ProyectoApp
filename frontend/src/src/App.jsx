
import './App.css';
import {Route,Routes,} from 'react-router-dom';
import NavBar from './components/Navbar';
import { Link } from 'react-router-dom';

import Secciones from "./components/Secciones"

const Home =()=> <h1>Home</h1>;

/*const Dormitorios=()=> {
  const secciones=[
    "Cabeceras",
    "Comodas",
    "Dormitorios Cabeceras",
    "Muebles Noche",
    "Sinfonieres",
  ]
  return(
    <div>
      <h1>Dormitorios</h1>
      <h2>Productos</h2>
      <ul>
        {secciones.map(seccion=>(
          <li key={seccion}><Link to={`/productos/${seccion}`}>{seccion}</Link></li>
        ))}
      </ul>
    </div>
  )
}
const Colchones=()=> <h1>Colchones</h1>;
const Muebles=()=> <h1>Muebles</h1>;
const Sofas=()=> <h1>Sofas</h1>;
const Armarios=()=> <h1>Armarios</h1>;
const Mesas=()=> <h1>Mesas</h1>;
const Sillas=()=> <h1>Sillas</h1>;*/
//const Secciones=()=> <h1>Secciones</h1>
//<Route path='/:departamentName' element={<Shop department={departamentName}/>}/> 


function App() {
  return (
    <div className="App">

     <NavBar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route index element={<Home />}/>   

        <Route path='/secciones/:seccion' element={<Secciones/>}/>

        <Route path="*" element={<h1>404</h1>}/>
       
        
      </Routes>

      <main>
      
      </main>
      
      <footer>
        
        <a href="about.html">  
        <p>Sobre Nosotros</p>
        </a>
        <a href="contacto.html">
        <p>Contacto</p>
        </a>
        <a href="localizacion.html">
         <p>Localizacion</p>
         </a>
         <a href="cookies.html">
         <p>Cookies</p>
         </a>
       </footer>
       
      </div>
    
  );
}

export default App;




/*         
        <Route path="/dormitorios" element={<Dormitorios/>}/>
        <Route path='/colchones' element={<Colchones/>}/>
        <Route path='/muebles' element={<Muebles/>}/>
        <Route path='/sofas'   element={<Sofas/>}/>
        <Route path="/armarios" element={<Armarios/>}/>
        <Route path='/mesas'  element={<Mesas/>}/>
        <Route path='/sillas' element={<Sillas/>}/>
 */










