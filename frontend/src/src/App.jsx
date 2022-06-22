import './App.css';
import {Route,Routes,} from 'react-router-dom';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Secciones from "./components/Secciones"
import Items from './components/Items'
import background from './images/fondo-pantalla.jpg'
import Home from './views/Home';
import styles from "./styles/Main.module.css"







function App() {
  return (
    <div className="App">

     <NavBar/>

      
      <main>
      <div className={styles.backgroundwrapper}>
        <img src={background} className={styles.background} alt="Background"/>
        <div className={styles.contentwrapper}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route index element={<Home/>}/>  
            
          

              <Route path='/productos/:id_producto' element={<Secciones/>}/>
              <Route path='/secciones/:id_seccion'  element={<Items/>}/>
            

            <Route path="*" element={<h1>404</h1>}/>
          
            
          </Routes>
        </div>
      </div>


      </main>
      

      <Footer/>
       
      </div>
    
  );
}

export default App;

/*

    */


/*<Route path='/productos/:id_producto/:id_seccion/:id_item' element={<Secciones/>}/>*/












