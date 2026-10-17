import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardItem from "./CardItem";
import styles from "./Items.module.css";
import { backendURL } from "../config.js";

const Items = () => {
  const params = useParams();

  const [items, setItems] = useState([]);
  const [listItems, setListItems] = useState([]);

  // Solicita al backend los artículos de la sección abierta.
  const fetchItems = useCallback(async () => {
    const response = await fetch(
      backendURL + "secciones/" + params.id_seccion + "/items",
    );
    const data = await response.json();
    setItems(data);
  }, [params.id_seccion]);

  // Convierte los datos recibidos en tarjetas de artículo.
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    const itemsHTML = items.map((item) => (
      <CardItem key={item.id_item ?? item.id} item={item} />
    ));
    setListItems(itemsHTML);
  }, [items]);

  return (
    <>
      <h1> Items </h1>
      <div className={styles.items + " " + styles.container}>
        {listItems}
      </div>
    </>
  );
};

export default Items;
