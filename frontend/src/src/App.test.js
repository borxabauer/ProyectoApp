import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn(() => new Promise(() => {}));
});

afterEach(() => {
  global.fetch = originalFetch;
});

test('renderiza la página de ubicación dentro del router de la aplicación', () => {
  render(
    <MemoryRouter initialEntries={['/localizacion']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Visítanos' })).toBeInTheDocument();
});
