import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardItem from "./CardItem";
import styles from "./Items.module.css";
import { backendURL } from "../config.js";

const Items = () => {
  const { id_seccion: sectionId } = useParams();
  const [items, setItems] = useState([]);

  // Carga los artículos de la sección activa desde el backend.
  const fetchItems = useCallback(async () => {
    const response = await fetch(`${backendURL}secciones/${sectionId}/items`);
    const data = await response.json();
    setItems(data);
  }, [sectionId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <section className={styles.page}>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Explora nuestra colección</p>
        <h1>Artículos</h1>
        <p>Encuentra el mueble perfecto para tu hogar.</p>
      </header>
      {items.length > 0 ? (
        <div className={styles.container}>
          {items.map((item) => (
            <CardItem key={item.id_item ?? item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No hay artículos disponibles en esta sección.</p>
      )}
    </section>
  );
};

export default Items;
