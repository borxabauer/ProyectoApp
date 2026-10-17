import { useEffect, useRef } from "react";
import BootstrapCarousel from "bootstrap/js/dist/carousel";
import dormitorio1 from '../images/dormitorio1.jpg'
import dormitorio2 from '../images/dormitorio2.jpg'
import mueble from '../images/mueble1.jpg'
import './Carousel.css'

// Presenta las imágenes destacadas y las rota automáticamente cada dos segundos.
function Carousel() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = new BootstrapCarousel(carouselRef.current, {
      interval: 2000,
      ride: false,
    });
    carousel.cycle();

    return () => carousel.dispose();
  }, []);

  return (
    <div
      id="carouselExampleIndicators"
      ref={carouselRef}
      className="carouselslide"
      data-bs-interval="2000"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        />
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={dormitorio1} className="d-block w-100" alt="Dormitorio" />
        </div>
        <div className="carousel-item">
          <img src={dormitorio2} className="d-block w-100" alt="Cama" />
        </div>
        <div className="carousel-item">
          <img src={mueble} className="d-block w-100" alt="Mueble" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

export default Carousel;








