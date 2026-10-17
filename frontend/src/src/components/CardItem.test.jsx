import { fireEvent, render, screen } from "@testing-library/react";
import { CartProvider } from "../context/CartContext";
import CardItem from "./CardItem";

const item = {
  id_item: 7,
  nombre_item: "Mesa de prueba",
  descripcion: "Mesa de comedor",
  precio: 24,
  imagen: "mesa.jpg",
};

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = jest.fn(function showModal() {
    this.setAttribute("open", "");
  });
  HTMLDialogElement.prototype.close = jest.fn(function close() {
    this.removeAttribute("open");
    fireEvent(this, new Event("close"));
  });
});

test("amplía la imagen del artículo y permite cerrarla", () => {
  render(
    <CartProvider>
      <CardItem item={item} />
    </CartProvider>,
  );

  fireEvent.click(screen.getByRole("button", { name: "Ampliar imagen de Mesa de prueba" }));

  const dialog = screen.getByRole("dialog", { name: "Imagen ampliada de Mesa de prueba" });
  expect(dialog).toHaveAttribute("open");
  expect(dialog.querySelector("img")).toHaveAttribute("alt", "Mesa de prueba");

  fireEvent.click(screen.getByRole("button", { name: "Cerrar imagen ampliada" }));
  expect(dialog).not.toHaveAttribute("open");
});

test("cierra la imagen ampliada al pulsar Escape", () => {
  render(
    <CartProvider>
      <CardItem item={item} />
    </CartProvider>,
  );

  fireEvent.click(screen.getByRole("button", { name: "Ampliar imagen de Mesa de prueba" }));
  const dialog = screen.getByRole("dialog", { name: "Imagen ampliada de Mesa de prueba" });

  fireEvent.keyDown(dialog, { key: "Escape" });

  expect(dialog).not.toHaveAttribute("open");
});
