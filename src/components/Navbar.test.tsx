import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

describe("Navbar Component", () => {
  beforeEach(() => {
    // Mock de localStorage
    let store: Record<string, string> = {};
    const localStorageMock = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value; },
      clear: () => { store = {}; },
      removeItem: (key: string) => { delete store[key]; },
    };
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
  });

  test("renderiza el título Mentes Creativas", () => {
    render(<Navbar />);
    expect(screen.getByText(/Mentes Creativas/i)).toBeInTheDocument();
  });

  test("renderiza el subtítulo de la universidad", () => {
    render(<Navbar />);
    expect(screen.getByText(/Universidad Cooperativa de Colombia/i)).toBeInTheDocument();
  });

  test("renderiza el botón de tema", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /Tema/i })).toBeInTheDocument();
  });

  test("muestra el indicador de actividades", () => {
    render(<Navbar />);
    expect(screen.getByText(/3 Actividades/i)).toBeInTheDocument();
  });

  test("cambia el tema al hacer clic en el botón", () => {
    render(<Navbar />);
    const themeButton = screen.getByRole("button", { name: /Tema/i });
    
    fireEvent.click(themeButton);
    
    // Verificar que se llamó la función de toggle
    expect(document.documentElement.classList.toggle).toHaveBeenCalled();
  });

  test("renderiza el logo SVG", () => {
    const { container } = render(<Navbar />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  test("tiene la estructura de header correcta", () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
  });
});