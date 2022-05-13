
import './App.css';
import {Route,Routes,Link} from 'react-router-dom';

const Home =()=> <h1>Home</h1>;
const Dormitorios=()=> <h1>Dormitorios</h1>;
const Colchones=()=> <h1>Colchones</h1>;
const Muebles=()=> <h1>Muebles</h1>;
const Sofas=()=> <h1>Sofas</h1>;
const Armarios=()=> <h1>Armarios</h1>;
const Mesas=()=> <h1>Mesas</h1>;
const Sillas=()=> <h1>Sillas</h1>;

//<Route path='/:departamentName' element={<Shop department={departamentName}/>}/> 

function App() {
  return (
    <div className="App">
      <header>
        <h1> TIENDA </h1>
        <nav>
          <ul>
            <Link to="/">Home</Link>
            <Link to="/dormitorios">Dormitorios</Link>
            <Link to="/colchones">Colchones</Link>
            <Link to="/muebles">Muebles</Link>
            <Link to="/sofas">Sofas</Link>
            <Link to="/armarios">Armarios</Link>
            <Link to="/mesas">Mesas</Link>
            <Link to="/sillas">Sillas</Link>       
          
           </ul>        
         </nav>
       
      </header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route index element={<Home />}/>           
        
        <Route path="/dormitorios" element={<Dormitorios/>}/>
        <Route path='/colchones' element={<Colchones/>}/>
        <Route path='/muebles' element={<Muebles/>}/>
        <Route path='/sofas'   element={<Sofas/>}/>
        <Route path="/armarios" element={<Armarios/>}/>
        <Route path='/mesas'  element={<Mesas/>}/>
        <Route path='/sillas' element={<Sillas/>}/>
        <Route path="*" element={<h1>404</h1>}/>
       
        
      </Routes>

      <main>
      COSITAS
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















