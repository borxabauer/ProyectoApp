import { render, screen } from "@testing-library/react";
import Location from "./Location";

test("muestra la dirección y un mapa con enlace para obtener indicaciones", () => {
  render(<Location />);

  expect(
    screen.getByText("Calle Falperra, 6, 4.º D, A Coruña, España"),
  ).toBeInTheDocument();
  expect(screen.getByTitle(/Mapa de ubicación/)).toHaveAttribute(
    "src",
    expect.stringContaining("google.com/maps?q="),
  );
  expect(screen.getByRole("link", { name: "Cómo llegar" })).toHaveAttribute(
    "href",
    expect.stringContaining("google.com/maps/dir/"),
  );
});
