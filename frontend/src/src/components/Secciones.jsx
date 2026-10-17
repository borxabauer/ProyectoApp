import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Secciones.module.css";
import { backendURL } from "../config.js";

const Secciones = () => {
  const { id_producto: productId } = useParams();
  const [sections, setSections] = useState([]);

  // Carga las secciones vinculadas al producto seleccionado.
  const fetchSections = useCallback(async () => {
    const response = await fetch(`${backendURL}productos/${productId}/secciones`);
    const data = await response.json();
    setSections(data);
  }, [productId]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  return (
    <section className={styles.page}>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Un espacio para cada idea</p>
        <h1>Secciones</h1>
        <p>Elige una categoría para descubrir nuestros artículos.</p>
      </header>
      {sections.length > 0 ? (
        <ul className={styles.list}>
          {sections.map((section) => (
            <li key={section.id_seccion}>
              <Link to={`/secciones/${section.id_seccion}`}>
                <span>{section.nombre_seccion}</span>
                <span className={styles.arrow} aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No hay secciones disponibles para este producto.</p>
      )}
    </section>
  );
};

export default Secciones;
