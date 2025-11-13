import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BackgroundMusic from "./BackgroundMusic";

// Mock de framer-motion
jest.mock("framer-motion", () => {
  const React = require('react');
  return {
    motion: {
      button: React.forwardRef(({ children, onClick, ...props }: any, ref: any) => (
        <button ref={ref} onClick={onClick} {...props}>
          {children}
        </button>
      )),
      svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
      polygon: ({ ...props }: any) => <polygon {...props} />,
      path: ({ ...props }: any) => <path {...props} />,
      line: ({ ...props }: any) => <line {...props} />,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

// Mock completo del elemento Audio
class MockAudio {
  volume = 1;
  muted = false;
  loop = false;
  preload = "";
  _onplay: (() => void) | null = null;
  _onpause: (() => void) | null = null;
  
  play = jest.fn(() => {
    if (this._onplay) this._onplay();
    return Promise.resolve();
  });
  
  pause = jest.fn(() => {
    if (this._onpause) this._onpause();
  });
  
  addEventListener = jest.fn((event: string, handler: () => void) => {
    if (event === 'play') this._onplay = handler;
    if (event === 'pause') this._onpause = handler;
  });
  
  removeEventListener = jest.fn((event: string) => {
    if (event === 'play') this._onplay = null;
    if (event === 'pause') this._onpause = null;
  });
}

// Reemplazar Audio global
(global as any).Audio = MockAudio;

// Mock de document.addEventListener para evitar errores
const originalAddEventListener = document.addEventListener;
const mockDocumentAddEventListener = jest.fn((event, handler, options) => {
  // No ejecutar el handler automáticamente para evitar errores
  if (event === 'click' && options?.once) {
    // No hacer nada
    return;
  }
  return originalAddEventListener.call(document, event, handler, options);
});

describe("BackgroundMusic Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.addEventListener = mockDocumentAddEventListener as any;
  });

  afterEach(() => {
    document.addEventListener = originalAddEventListener;
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

  test("cambia el estado al hacer clic en el botón", async () => {
    const { container } = render(<BackgroundMusic />);
    const button = container.querySelector("button") as HTMLButtonElement;
    
    fireEvent.click(button);
    
    // Después del clic, el título debería cambiar
    await waitFor(() => {
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

  test("cambia el ícono cuando se hace clic", async () => {
    const { container } = render(<BackgroundMusic />);
    const button = container.querySelector("button") as HTMLButtonElement;
    
    // Estado inicial
    expect(button).toHaveAttribute("title", "Silenciar música");
    
    // Click para silenciar
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(button).toHaveAttribute("title", "Activar música");
    });
    
    // Click para activar de nuevo
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(button).toHaveAttribute("title", "Silenciar música");
    });
  });
});