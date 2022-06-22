import dormitorio1 from '../images/dormitorio1.jpg'
import dormitorio2 from '../images/dormitorio2.jpg'
import mueble from '../images/mueble1.jpg'
import './Carousel.css'

   function Carousel () {
    
    return (

    <div id="carouselExampleIndicators" className="carouselslide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={dormitorio1} className="d-block w-100" alt="Dormitorio"/>
    </div>
    <div className="carousel-item">
      <img src={dormitorio2} className="d-block w-100" alt="Cama"/>
    </div>
    <div className="carousel-item">
      <img src={mueble} className="d-block w-100" alt="Mueble"/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

    )
  }

  export default Carousel
  
  
    
    
  




























