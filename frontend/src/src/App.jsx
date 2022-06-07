import './App.css';
import {Route,Routes,} from 'react-router-dom';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Secciones from "./components/Secciones"
import Items from './components/Items'
import Item from './components/Item';
import background from './images/fondo-pantalla.jpg'
import Formulario from './components/Formulario';
import Carousel from './components/Carousel';




 const Home=()=> <h1>Home</h1>;


function App() {
  return (
    <div className="App">

     <NavBar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route index element={<Home/>}/>  
        
       

          <Route path='/productos/:id_producto' element={<Secciones/>}/>
          <Route path='/secciones/:id_seccion'  element={<Items/>}/>
          <Route path='/items/:id_item'          element={<Item/>}/>

        <Route path="*" element={<h1>404</h1>}/>
       
        
      </Routes>
      < Formulario/>
      <main>
      
       <img src={background} className="background" alt="Background"/>

      


      
      
      </main>
      
      <Footer/>
       
      </div>
    
  );
}

export default App;

/*

    */


/*<Route path='/productos/:id_producto/:id_seccion/:id_item' element={<Secciones/>}/>*/












