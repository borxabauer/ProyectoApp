import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "./Cart.module.css";

// Presenta un importe como moneda en el formato habitual de España.
function formatPrice(price) {
  return Number(price).toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
}

// Muestra los artículos del carrito, su subtotal y el total de la compra.
const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const total = cart.reduce(
    (sum, item) => sum + Number(item.precio) * item.cantidad,
    0,
  );

  return (
    <section className={styles.cart}>
      <h1>Carrito de la compra</h1>
      {cart.length === 0 ? (
        <div className={styles.empty}>
          <p>Tu carrito está vacío.</p>
          <Link to="/">Seguir comprando</Link>
        </div>
      ) : (
        <>
          <ul className={styles.items}>
            {cart.map((item) => (
              <li className={styles.item} key={item.id_item}>
                <div className={styles.details}>
                  <h2>{item.nombre_item}</h2>
                  <p>{formatPrice(item.precio)} por unidad</p>
                </div>
                <label className={styles.quantity}>
                  Cantidad
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={item.cantidad}
                    aria-label={`Cantidad de ${item.nombre_item}`}
                    onChange={(event) =>
                      updateQuantity(item.id_item, event.target.value)
                    }
                  />
                </label>
                <strong>{formatPrice(Number(item.precio) * item.cantidad)}</strong>
                <button
                  className={styles.remove}
                  type="button"
                  onClick={() => removeFromCart(item.id_item)}
                  aria-label={`Eliminar ${item.nombre_item} del carrito`}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.summary}>
            <strong>Total: {formatPrice(total)}</strong>
            <Link to="/">Seguir comprando</Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
