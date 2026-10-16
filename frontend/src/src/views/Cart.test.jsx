import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import Cart from "./Cart";

beforeEach(() => {
  window.localStorage.setItem(
    "muebles-cart",
    JSON.stringify([
      {
        id_item: 7,
        nombre_item: "Mesa",
        precio: 24,
        cantidad: 2,
      },
    ]),
  );
});

test("permite cambiar cantidades y eliminar productos del carrito", () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <Cart />
      </CartProvider>
    </MemoryRouter>,
  );

  expect(screen.getByText("Mesa")).toBeInTheDocument();
  fireEvent.change(screen.getByRole("spinbutton", { name: "Cantidad de Mesa" }), {
    target: { value: "3" },
  });
  expect(screen.getByText(/Total: 72,00/)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Eliminar Mesa del carrito" }));
  expect(screen.getByText("Tu carrito está vacío.")).toBeInTheDocument();
});
