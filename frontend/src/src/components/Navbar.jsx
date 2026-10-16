import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import styles from "./Navbar.module.css";
import { backendURL } from "../config.js";

const NavBar = () => {
  const [productos, setProductos] = useState([]);

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
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
