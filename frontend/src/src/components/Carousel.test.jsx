import { render } from "@testing-library/react";
import BootstrapCarousel from "bootstrap/js/dist/carousel";
import Carousel from "./Carousel";

afterEach(() => {
  jest.restoreAllMocks();
});

test("inicia el carrusel cada dos segundos y lo libera al desmontar", () => {
  const cycle = jest.spyOn(BootstrapCarousel.prototype, "cycle");
  const dispose = jest.spyOn(BootstrapCarousel.prototype, "dispose");
  const { container, unmount } = render(<Carousel />);
  const carouselElement = container.querySelector(".carouselslide");
  const carouselInstance = BootstrapCarousel.getInstance(carouselElement);

  expect(carouselElement).toHaveAttribute("data-bs-interval", "2000");
  expect(carouselInstance._config.interval).toBe(2000);
  expect(cycle).toHaveBeenCalledTimes(1);

  unmount();

  expect(dispose).toHaveBeenCalledTimes(1);
  expect(BootstrapCarousel.getInstance(carouselElement)).toBeNull();
});
