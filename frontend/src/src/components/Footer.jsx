import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

// Pie de página compartido con los enlaces informativos de la tienda.
const Footer = () => (
  <footer className={styles.footer}>
    <nav className={styles.links} aria-label="Información de la tienda">
      <a href="/about.html">Sobre nosotros</a>
      <a href="/contacto.html">Contacto</a>
      <Link to="/localizacion">Localización</Link>
      <a href="/cookies.html">Cookies</a>
    </nav>
    <p className={styles.copyright}>Muebles · Tu hogar, a tu manera</p>
  </footer>
);

export default Footer;
