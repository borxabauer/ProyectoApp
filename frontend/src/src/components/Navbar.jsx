import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import styles from "./Navbar.module.css";
import { backendURL } from "../config.js";
import { useCart } from "../context/CartContext";

const NavBar = () => {
  const [productos, setProductos] = useState([]);
  const { cart } = useCart();
  const cartCount = cart.reduce((count, item) => count + item.cantidad, 0);

  async function fetchProductos() {
    const response = await fetch(backendURL + "productos/");
    const data = await response.json();
    setProductos(data);
  }

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Link to="./">
          <img src={logo} className={styles.logo} alt="Main Logo" />
        </Link>

        <ul>
          <li>
            <Link to="/"></Link>
          </li>
          {productos.map((item) => (
            <li key={item.id_producto}>
              <Link to={"/productos/" + item.id_producto}>
                {item.nombre_producto}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/carrito" aria-label={`Carrito, ${cartCount} productos`}>
              <span className={styles.cartLink}>
                <svg
                  className={styles.cartIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {cartCount > 0 && (
                  <span className={styles.cartCount} aria-hidden="true">
                    {cartCount}
                  </span>
                )}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
