import styles from "./Card.module.css";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { backendURL } from "../config.js";

// Muestra un artículo del catálogo y permite añadirlo al carrito.
function CardItem({ item }) {
  const { addToCart } = useCart();
  const [isImageOpen, setIsImageOpen] = useState(false);
  const imageDialogRef = useRef(null);
  const imageUrl = `${backendURL}public/${item.imagen}`;
  const price = Number(item.precio).toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  // Sincroniza el estado de React con el diálogo nativo del navegador.
  useEffect(() => {
    const dialog = imageDialogRef.current;
    if (!dialog) return;

    if (isImageOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isImageOpen && dialog.open) {
      dialog.close();
    }
  }, [isImageOpen]);

  return (
    <article className={styles.card}>
      <div className={styles.imageFrame}>
        <button
          className={styles.imageButton}
          type="button"
          aria-label={`Ampliar imagen de ${item.nombre_item}`}
          onClick={() => setIsImageOpen(true)}
        >
          <img
            src={imageUrl}
            className={styles.imagen}
            alt={item.nombre_item}
            loading="lazy"
          />
        </button>
      </div>
      <div className={styles.content}>
        <h2 className={styles.nombreItem}>{item.nombre_item}</h2>
        <p className={styles.descripcion}>{item.descripcion}</p>
        <div className={styles.cardFooter}>
          <span className={styles.precio}>{price}</span>
          <button
            className={styles.button}
            type="button"
            onClick={() => addToCart(item)}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
      {/* El diálogo modal permite ampliar la imagen sin salir del catálogo. */}
      <dialog
        ref={imageDialogRef}
        className={styles.imageDialog}
        aria-label={`Imagen ampliada de ${item.nombre_item}`}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            // Cierra también en entornos donde el diálogo nativo no gestione Escape.
            event.preventDefault();
            setIsImageOpen(false);
          }
        }}
        onCancel={() => setIsImageOpen(false)}
        onClose={() => setIsImageOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
      >
        <button
          className={styles.closeDialog}
          type="button"
          aria-label="Cerrar imagen ampliada"
          onClick={() => imageDialogRef.current?.close()}
        >
          ×
        </button>
        <img src={imageUrl} alt={item.nombre_item} className={styles.enlargedImage} />
        <p className={styles.dialogCaption}>{item.nombre_item}</p>
      </dialog>
    </article>
  );
}

export default CardItem;
