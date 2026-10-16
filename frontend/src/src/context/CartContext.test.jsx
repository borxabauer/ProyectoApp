import { fireEvent, render, screen } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

function CartActions() {
  const { cart, addToCart } = useCart();
  const product = {
    id_item: 7,
    nombre_item: "Mesa",
    precio: 24,
  };

  return (
    <>
      <button onClick={() => addToCart(product)}>Añadir</button>
      <span>{cart.length}:{cart[0]?.cantidad ?? 0}</span>
    </>
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

test("añade productos y conserva las cantidades en localStorage", () => {
  render(
    <CartProvider>
      <CartActions />
    </CartProvider>,
  );

  fireEvent.click(screen.getByRole("button", { name: "Añadir" }));
  fireEvent.click(screen.getByRole("button", { name: "Añadir" }));

  expect(screen.getByText("1:2")).toBeInTheDocument();
  expect(JSON.parse(window.localStorage.getItem("muebles-cart"))).toEqual([
    {
      id_item: 7,
      nombre_item: "Mesa",
      precio: 24,
      cantidad: 2,
    },
  ]);
});
