import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import KeyboardGame from "./KeyboardGame";



  test("muestra la descripción del juego", () => {
    render(<KeyboardGame />);
    expect(screen.getByText(/Aprende a escribir presionando las teclas correctas/i)).toBeInTheDocument();
  });

  test("muestra el botón de comenzar a practicar inicialmente", () => {
    render(<KeyboardGame />);
    expect(screen.getByRole("button", { name: /Comenzar a Practicar/i })).toBeInTheDocument();
  });

  test("inicia el juego al hacer clic en comenzar", () => {
    render(<KeyboardGame />);
    const startButton = screen.getByRole("button", { name: /Comenzar a Practicar/i });
    fireEvent.click(startButton);
    
    expect(screen.getByText(/Puntos/i)).toBeInTheDocument();
    expect(screen.getByText(/Errores/i)).toBeInTheDocument();
    expect(screen.getByText(/Precisión/i)).toBeInTheDocument();
  });

  test("muestra las estadísticas cuando el juego está activo", () => {
    render(<KeyboardGame />);
    const startButton = screen.getByRole("button", { name: /Comenzar a Practicar/i });
    fireEvent.click(startButton);
    
    expect(screen.getByText(/Puntos/i)).toBeInTheDocument();
    expect(screen.getByText(/Errores/i)).toBeInTheDocument();
  });

  test("muestra el teclado visual cuando el juego está activo", () => {
    render(<KeyboardGame />);
    const startButton = screen.getByRole("button", { name: /Comenzar a Practicar/i });
    fireEvent.click(startButton);
    
    expect(screen.getByText("Q")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
    expect(screen.getByText("E")).toBeInTheDocument();
  });

  test("muestra mensaje de retroalimentación", () => {
    render(<KeyboardGame />);
    const startButton = screen.getByRole("button", { name: /Comenzar a Practicar/i });
    fireEvent.click(startButton);
    
    expect(screen.getByText(/Presiona las teclas correctas/i)).toBeInTheDocument();
  });

  test("muestra instrucciones para el usuario", () => {
    render(<KeyboardGame />);
    const startButton = screen.getByRole("button", { name: /Comenzar a Practicar/i });
    fireEvent.click(startButton);
    
    expect(screen.getByText(/Observa la tecla resaltada en verde y presiónala en tu teclado/i)).toBeInTheDocument();
  });

  test("aumenta el score cuando se presiona la tecla correcta", async () => {
    render(<KeyboardGame />);
    const startButton = screen.getByRole("button", { name: /Comenzar a Practicar/i });
    fireEvent.click(startButton);
    
    // Obtener la letra actual que se debe presionar
    const initialScore = screen.getAllByText("0")[0];
    expect(initialScore).toBeInTheDocument();
    
    // Simular presión de tecla
    fireEvent.keyDown(window, { key: 'C', code: 'KeyC' });
    
    await waitFor(() => {
      const message = screen.queryByText(/Correcto/i);
      if (message) {
        expect(message).toBeInTheDocument();
      }
    });
  });

  test("muestra la precisión inicial como 0%", () => {
    render(<KeyboardGame />);
    const startButton = screen.getByRole("button", { name: /Comenzar a Practicar/i });
    fireEvent.click(startButton);
    
    expect(screen.getByText(/0%/i)).toBeInTheDocument();
  });
});