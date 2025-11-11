import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColorMixer from "./ColorMixer";

describe("ColorMixer Component", () => {
  test("renderiza el título del laboratorio", () => {
    render(<ColorMixer />);
    expect(screen.getByText(/Laboratorio de Mezclas de Color/i)).toBeInTheDocument();
  });

  test("muestra los tres colores primarios", () => {
    render(<ColorMixer />);
    expect(screen.getByText("Rojo")).toBeInTheDocument();
    expect(screen.getByText("Azul")).toBeInTheDocument();
    expect(screen.getByText("Amarillo")).toBeInTheDocument();
  });

  test("muestra las estadísticas iniciales", () => {
    render(<ColorMixer />);
    expect(screen.getByText(/Mezclas Realizadas/i)).toBeInTheDocument();
    expect(screen.getByText(/Colores Secundarios Creados/i)).toBeInTheDocument();
    expect(screen.getByText(/Desafíos Completados/i)).toBeInTheDocument();
  });

  test("muestra instrucción inicial para seleccionar primer color", () => {
    render(<ColorMixer />);
    expect(screen.getByText(/Selecciona el primer color primario/i)).toBeInTheDocument();
  });

  test("permite seleccionar el primer color", () => {
    render(<ColorMixer />);
    const redButton = screen.getByRole("button", { name: /Rojo/i });
    fireEvent.click(redButton);
    
    expect(screen.getByText(/Ahora selecciona un segundo color diferente/i)).toBeInTheDocument();
  });

  test("muestra el botón de modo desafío", () => {
    render(<ColorMixer />);
    expect(screen.getByRole("button", { name: /Activar Modo Desafío/i })).toBeInTheDocument();
  });

  test("muestra información educativa sobre colores primarios", () => {
    render(<ColorMixer />);
    // Usar getAllByText porque "Colores Primarios" aparece varias veces
    const elements = screen.getAllByText(/Colores Primarios/i);
    expect(elements.length).toBeGreaterThan(0);
    expect(screen.getByText(/Rojo, Azul y Amarillo son la base/i)).toBeInTheDocument();
  });

  test("muestra información sobre colores secundarios", () => {
    render(<ColorMixer />);
    // Usar getAllByText porque "Colores Secundarios" aparece varias veces
    const elements = screen.getAllByText(/Colores Secundarios/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  test("muestra controles de proporción cuando se selecciona primer color", () => {
    render(<ColorMixer />);
    const redButton = screen.getByRole("button", { name: /Rojo/i });
    fireEvent.click(redButton);
    
    expect(screen.getByText(/Control de Proporción/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /25%/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /50%/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /75%/i })).toBeInTheDocument();
  });

  test("muestra información sobre temperatura del color", () => {
    render(<ColorMixer />);
    expect(screen.getByText(/Temperatura del Color/i)).toBeInTheDocument();
  });

  test("crea un color al seleccionar dos colores primarios", async () => {
    render(<ColorMixer />);
    
    // Seleccionar primer color (Rojo)
    const redButton = screen.getByRole("button", { name: /Rojo/i });
    fireEvent.click(redButton);
    
    // Seleccionar segundo color (Azul)
    const blueButton = screen.getByRole("button", { name: /Azul/i });
    fireEvent.click(blueButton);
    
    // Esperar a que aparezca el resultado
    await waitFor(() => {
      expect(screen.getByText(/¡Creaste Morado!/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});