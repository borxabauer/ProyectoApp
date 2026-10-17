import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CART_STORAGE_KEY = "muebles-cart";
const CartContext = createContext(null);

// Recupera el carrito del navegador y descarta entradas dañadas o incompletas.
function loadCart() {
  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);
    if (!Array.isArray(parsedCart)) {
      throw new Error("El contenido guardado no es una lista.");
    }

    return parsedCart.filter((item) => {
      const validItem =
        item &&
        (typeof item.id_item === "number" || typeof item.id_item === "string") &&
        typeof item.nombre_item === "string" &&
        Number.isFinite(Number(item.precio)) &&
        Number.isInteger(item.cantidad) &&
        item.cantidad > 0;

      if (!validItem) {
        console.error("Se ha omitido un producto no válido del carrito guardado.");
      }
      return validItem;
    });
  } catch (error) {
    console.error("No se pudo leer el carrito guardado.", error);
    return [];
  }
}

// Comparte el estado y las operaciones del carrito y lo persiste en localStorage.
export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("No se pudo guardar el carrito.", error);
    }
  }, [cart]);

  // Añade un producto o aumenta en uno la cantidad si ya estaba en el carrito.
  const addToCart = useCallback((product) => {
    const productId = product.id_item ?? product.id;
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id_item === productId);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id_item === productId
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }
      return [...currentCart, { ...product, id_item: productId, cantidad: 1 }];
    });
  }, []);

  // Actualiza la cantidad solo si es un entero positivo.
  const updateQuantity = useCallback((productId, quantity) => {
    const parsedQuantity = Number(quantity);
    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      return;
    }
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id_item === productId ? { ...item, cantidad: parsedQuantity } : item,
      ),
    );
  }, []);

  // Quita del carrito todas las unidades del producto indicado.
  const removeFromCart = useCallback((productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id_item !== productId),
    );
  }, []);

  const value = useMemo(
    () => ({ cart, addToCart, updateQuantity, removeFromCart }),
    [cart, addToCart, updateQuantity, removeFromCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Permite acceder al carrito desde componentes descendientes de CartProvider.
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe utilizarse dentro de CartProvider.");
  }
  return context;
}
