import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renderiza el título principal de Mentes Creativas", () => {
  render(<App />);
  // Buscar específicamente el h1 (heading level 1) con el texto
  const titleElement = screen.getByRole("heading", { level: 1, name: /Mentes Creativas/i });
  expect(titleElement).toBeInTheDocument();
});