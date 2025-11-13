import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BackgroundMusic from "./BackgroundMusic";

// Mock completo de framer-motion para evitar warnings
jest.mock("framer-motion", () => ({
  motion: {
    button: ({ children, onClick, style, title, ...props }: any) => (
      <button onClick={onClick} style={style} title={title} {...props}>
        {children}
      </button>
    ),
    svg: ({ children, ...props }: any) => {
      // Destructurar para eliminar props de animación que no se usan en tests
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
      return <svg {...rest}>{children}</svg>;
    },
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("BackgroundMusic Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza el botón de música", async () => {
    const { container } = render(<BackgroundMusic />);
    await waitFor(() => {
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
    });
  });

  test("el botón tiene el título correcto", async () => {
    const { container } = render(<BackgroundMusic />);
    await waitFor(() => {
      const button = container.querySelector("button");
      expect(button).toHaveAttribute("title", "Silenciar música");
    });
  });

  test("cambia el estado al hacer clic en el botón", async () => {
    const { container } = render(<BackgroundMusic />);
    const button = container.querySelector("button") as HTMLButtonElement;
    
    await waitFor(() => {
      expect(button).toBeInTheDocument();
    });

    fireEvent.click(button);
    
    await waitFor(() => {
      expect(button).toHaveAttribute("title", "Activar música");
    });
  });

  test("muestra el ícono de volumen inicialmente", async () => {
    const { container } = render(<BackgroundMusic />);
    await waitFor(() => {
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  test("el botón está en posición fija", async () => {
    const { container } = render(<BackgroundMusic />);
    await waitFor(() => {
      const button = container.querySelector("button") as HTMLButtonElement;
      expect(button.style.position).toBe("fixed");
    });
  });

  test("renderiza el elemento audio", async () => {
    const { container } = render(<BackgroundMusic />);
    await waitFor(() => {
      const audio = container.querySelector("audio");
      expect(audio).toBeInTheDocument();
    });
  });

  test("el audio tiene el atributo loop", async () => {
    const { container } = render(<BackgroundMusic />);
    await waitFor(() => {
      const audio = container.querySelector("audio");
      expect(audio).toHaveAttribute("loop");
    });
  });

  test("el audio tiene preload automático", async () => {
    const { container } = render(<BackgroundMusic />);
    await waitFor(() => {
      const audio = container.querySelector("audio");
      expect(audio).toHaveAttribute("preload", "auto");
    });
  });

  test("el botón tiene estilos correctos", async () => {
    const { container } = render(<BackgroundMusic />);
    await waitFor(() => {
      const button = container.querySelector("button") as HTMLButtonElement;
      expect(button.style.bottom).toBe("2rem");
      expect(button.style.right).toBe("2rem");
      expect(button.style.borderRadius).toBe("50%");
    });
  });

  test("cambia el ícono cuando se hace clic", async () => {
    const { container } = render(<BackgroundMusic />);
    const button = container.querySelector("button") as HTMLButtonElement;
    
    await waitFor(() => {
      expect(button).toHaveAttribute("title", "Silenciar música");
    });
    
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(button).toHaveAttribute("title", "Activar música");
    });
  });
});