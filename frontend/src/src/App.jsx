
import './App.css';
import {Route,Routes,} from 'react-router-dom';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Secciones from "./components/Secciones"
import Items from './components/Items';

const Home =()=> <h1>Home</h1>;

function App() {
  return (
    <div className="App">

     <NavBar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route index element={<Home />}/>   

        <Route path='/productos/:id_producto' element={<Secciones/>}/>
        <Route path='/secciones/:id_seccion'  element={<Items/>}/>

        <Route path="*" element={<h1>404</h1>}/>
       
        
      </Routes>

      <main>
      
      </main>
      
      <Footer/>
       
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










