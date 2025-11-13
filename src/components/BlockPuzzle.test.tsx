import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlockPuzzle from "./BlockPuzzle";

describe("BlockPuzzle Component", () => {
  test("renderiza el título del componente", () => {
    render(<BlockPuzzle />);
    expect(screen.getByText(/Rompecabezas de Bloques/i)).toBeInTheDocument();
  });

  test("muestra el nivel actual correctamente", () => {
    render(<BlockPuzzle />);
    expect(screen.getByText(/Nivel Actual/i)).toBeInTheDocument();
    expect(screen.getByText(/1\/3/i)).toBeInTheDocument();
  });

  test("muestra las estadísticas iniciales", () => {
    render(<BlockPuzzle />);
    expect(screen.getByText(/Puntos/i)).toBeInTheDocument();
    expect(screen.getByText(/Piezas Restantes/i)).toBeInTheDocument();
  });

  test("renderiza el botón de reiniciar nivel", () => {
    render(<BlockPuzzle />);
    expect(screen.getByRole("button", { name: /Reiniciar Nivel/i })).toBeInTheDocument();
  });

  test("muestra el nombre del nivel principiante", () => {
    render(<BlockPuzzle />);
    expect(screen.getByText(/Nivel 1: Principiante/i)).toBeInTheDocument();
  });

  test("muestra las instrucciones de cómo jugar", () => {
    render(<BlockPuzzle />);
    expect(screen.getByText(/¿Cómo jugar?/i)).toBeInTheDocument();
    expect(screen.getByText(/Arrastra las piezas coloridas hacia el tablero blanco/i)).toBeInTheDocument();
  });

  test("muestra el título de piezas disponibles", () => {
    render(<BlockPuzzle />);
    expect(screen.getByText(/Piezas Disponibles/i)).toBeInTheDocument();
  });

  test("el score inicial es 0", () => {
    render(<BlockPuzzle />);
    const statCards = screen.getAllByText("0");
    expect(statCards.length).toBeGreaterThan(0);
  });
});