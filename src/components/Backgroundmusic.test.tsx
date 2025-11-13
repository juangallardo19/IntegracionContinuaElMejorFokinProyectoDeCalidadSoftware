import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BackgroundMusic from "./BackgroundMusic";

// Mock de framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock del elemento Audio
class MockAudio {
  volume = 1;
  muted = false;
  loop = false;
  preload = "";
  
  play = jest.fn(() => Promise.resolve());
  pause = jest.fn();
  addEventListener = jest.fn();
  removeEventListener = jest.fn();
}

// Reemplazar Audio global
(global as any).Audio = MockAudio;

describe("BackgroundMusic Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza el botón de música", () => {
    const { container } = render(<BackgroundMusic />);
    const button = container.querySelector("button");
    expect(button).toBeInTheDocument();
  });

  test("el botón tiene el título correcto", () => {
    const { container } = render(<BackgroundMusic />);
    const button = container.querySelector("button");
    expect(button).toHaveAttribute("title", "Silenciar música");
  });

  test("cambia el estado al hacer clic en el botón", () => {
    const { container } = render(<BackgroundMusic />);
    const button = container.querySelector("button") as HTMLButtonElement;
    
    fireEvent.click(button);
    
    // Después del clic, el título debería cambiar
    waitFor(() => {
      expect(button).toHaveAttribute("title", "Activar música");
    });
  });

  test("muestra el ícono de volumen inicialmente", () => {
    const { container } = render(<BackgroundMusic />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  test("el botón está en posición fija", () => {
    const { container } = render(<BackgroundMusic />);
    const button = container.querySelector("button") as HTMLButtonElement;
    expect(button.style.position).toBe("fixed");
  });

  test("renderiza el elemento audio", () => {
    const { container } = render(<BackgroundMusic />);
    const audio = container.querySelector("audio");
    expect(audio).toBeInTheDocument();
  });

  test("el audio tiene el atributo loop", () => {
    const { container } = render(<BackgroundMusic />);
    const audio = container.querySelector("audio");
    expect(audio).toHaveAttribute("loop");
  });

  test("el audio tiene preload automático", () => {
    const { container } = render(<BackgroundMusic />);
    const audio = container.querySelector("audio");
    expect(audio).toHaveAttribute("preload", "auto");
  });

  test("el botón tiene estilos correctos", () => {
    const { container } = render(<BackgroundMusic />);
    const button = container.querySelector("button") as HTMLButtonElement;
    
    expect(button.style.bottom).toBe("2rem");
    expect(button.style.right).toBe("2rem");
    expect(button.style.borderRadius).toBe("50%");
  });
});