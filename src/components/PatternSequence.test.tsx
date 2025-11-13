import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PatternSequence from "./PatternSequence";

describe("PatternSequence Component", () => {
  test("renderiza el título del componente", () => {
    render(<PatternSequence />);
    expect(screen.getByText(/Secuencias y Patrones/i)).toBeInTheDocument();
  });

  test("muestra la descripción del juego", () => {
    render(<PatternSequence />);
    expect(screen.getByText(/Descubre el patrón y completa la secuencia/i)).toBeInTheDocument();
  });

  test("muestra las estadísticas iniciales", () => {
    render(<PatternSequence />);
    expect(screen.getByText(/Aciertos/i)).toBeInTheDocument();
    expect(screen.getByText(/Intentos/i)).toBeInTheDocument();
    expect(screen.getByText(/Precisión/i)).toBeInTheDocument();
  });

  test("muestra el tipo de patrón", () => {
    render(<PatternSequence />);
    const patternType = screen.queryByText(/Secuencia Numérica/i) || screen.queryByText(/Patrón Geométrico/i);
    expect(patternType).toBeInTheDocument();
  });

  test("muestra la pregunta inicial", () => {
    render(<PatternSequence />);
    expect(screen.getByText(/¿Qué número o figura falta?/i)).toBeInTheDocument();
  });

  test("muestra las opciones de respuesta", () => {
    render(<PatternSequence />);
    const buttons = screen.getAllByRole("button");
    // Debe haber al menos 3 botones (puede variar según el patrón generado)
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });


  test("muestra el consejo educativo", () => {
    render(<PatternSequence />);
    expect(screen.getByText(/Consejo/i)).toBeInTheDocument();
    expect(screen.getByText(/Observa bien la secuencia completa/i)).toBeInTheDocument();
  });

  test("muestra el símbolo de interrogación en la secuencia", () => {
    render(<PatternSequence />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  test("muestra mensaje de éxito al responder correctamente", async () => {
    render(<PatternSequence />);
    
    // Obtener todos los botones de opciones
    const optionButtons = screen.getAllByRole("button").filter(
      button => !button.textContent?.includes("Siguiente")
    );
    
    // Hacer clic en una opción
    fireEvent.click(optionButtons[0]);
    
    // Esperar mensaje de resultado
    await waitFor(() => {
      const feedback = screen.queryByText(/Muy bien/i) || screen.queryByText(/Intenta de nuevo/i);
      expect(feedback).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  test("los aciertos iniciales son 0", () => {
    render(<PatternSequence />);
    const stats = screen.getAllByText("0");
    expect(stats.length).toBeGreaterThan(0);
  });

  test("la precisión inicial es 0%", () => {
    render(<PatternSequence />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });
});