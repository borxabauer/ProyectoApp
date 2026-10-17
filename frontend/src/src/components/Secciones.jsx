import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./Secciones.module.css";
import { backendURL } from "../config.js";

const Secciones = () => {
  const params = useParams();

  const [seccionList, setSeccionList] = useState([]);

  // Obtiene las secciones del producto seleccionado y prepara sus enlaces.
  const fetchSeccion = useCallback(async () => {
    const response = await fetch(
      backendURL + "productos/" + params.id_producto + "/secciones",
    );
    const data = await response.json();
    const seccionesHTML = data.map((sec) => (
      <li key={sec.id_seccion ?? sec.nombre_seccion}>
        <Link to={`/secciones/${sec.id_seccion}`}>{sec.nombre_seccion}</Link>
      </li>
    ));
    setSeccionList(seccionesHTML);
  }, [params.id_producto]);

  useEffect(() => {
    fetchSeccion();
  }, [fetchSeccion]);

  return (
    <>
      <div className={styles.secciones}>
        <h1>Secciones</h1>
        {seccionList}
      </div>
    </>
  );
};

export default Secciones;
