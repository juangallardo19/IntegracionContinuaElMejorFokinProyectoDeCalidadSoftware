import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DrawingCanvas from "./DrawingCanvas";

// Mock de framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("DrawingCanvas Component", () => {
  beforeEach(() => {
    // Mock de toDataURL para canvas
    HTMLCanvasElement.prototype.toDataURL = jest.fn(() => "data:image/png;base64,mock");
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      fillStyle: "",
      fillRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      lineWidth: 0,
      lineCap: "",
      lineJoin: "",
      strokeStyle: "",
      globalCompositeOperation: "",
      globalAlpha: 0,
      arc: jest.fn(),
      fill: jest.fn(),
      createRadialGradient: jest.fn(() => ({
        addColorStop: jest.fn(),
      })),
    })) as any;
  });

  test("renderiza el título del componente", () => {
    render(<DrawingCanvas />);
    expect(screen.getByText(/Lienzo de Dibujo Libre/i)).toBeInTheDocument();
  });

  test("muestra la descripción del lienzo", () => {
    render(<DrawingCanvas />);
    expect(screen.getByText(/Dibuja lo que quieras con colores y pinceles/i)).toBeInTheDocument();
  });

  test("muestra el selector de herramientas", () => {
    render(<DrawingCanvas />);
    expect(screen.getByRole("button", { name: /Lápiz/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Spray/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Borrador/i })).toBeInTheDocument();
  });

  test("muestra la sección de colores", () => {
    render(<DrawingCanvas />);
    const colorHeading = screen.getByRole("heading", { level: 4, name: /^Color$/i });
    expect(colorHeading).toBeInTheDocument();
  });

  test("muestra la sección de tamaño del pincel", () => {
    render(<DrawingCanvas />);
    expect(screen.getByText(/Tamaño/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Pequeño/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Mediano/i })).toBeInTheDocument();
    const buttons = screen.getAllByRole("button");
    const grandeButton = buttons.find(btn => btn.textContent === "Grande");
    const muyGrandeButton = buttons.find(btn => btn.textContent === "Muy Grande");
    expect(grandeButton).toBeInTheDocument();
    expect(muyGrandeButton).toBeInTheDocument();
  });

  test("cambia la herramienta al hacer clic", () => {
    render(<DrawingCanvas />);
    const sprayButton = screen.getByRole("button", { name: /Spray/i });
    fireEvent.click(sprayButton);
    expect(screen.getByText(/Spray: Efecto difuminado/i)).toBeInTheDocument();
  });

  test("cambia la herramienta a borrador", () => {
    render(<DrawingCanvas />);
    const eraserButton = screen.getByRole("button", { name: /Borrador/i });
    fireEvent.click(eraserButton);
    expect(screen.getByText(/Borrador: Borra tus trazos/i)).toBeInTheDocument();
  });

  test("renderiza el botón de limpiar todo", () => {
    render(<DrawingCanvas />);
    expect(screen.getByRole("button", { name: /Limpiar Todo/i })).toBeInTheDocument();
  });

  test("renderiza el botón de guardar dibujo", () => {
    render(<DrawingCanvas />);
    expect(screen.getByRole("button", { name: /Guardar Dibujo/i })).toBeInTheDocument();
  });

  test("muestra los consejos para dibujar", () => {
    render(<DrawingCanvas />);
    expect(screen.getByText(/Consejos para Dibujar/i)).toBeInTheDocument();
  });

  test("muestra el canvas para dibujar", () => {
    const { container } = render(<DrawingCanvas />);
    const canvas = container.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
  });

  test("cambia el tamaño del pincel al hacer clic", () => {
    render(<DrawingCanvas />);
    const buttons = screen.getAllByRole("button");
    const grandeButton = buttons.find(btn => btn.textContent === "Grande");
    
    if (grandeButton) {
      fireEvent.click(grandeButton);
      expect(grandeButton.classList.contains("btn-primary")).toBe(true);
    }
  });

  test("el botón de limpiar todo funciona sin errores", () => {
    render(<DrawingCanvas />);
    const clearButton = screen.getByRole("button", { name: /Limpiar Todo/i });
    expect(() => fireEvent.click(clearButton)).not.toThrow();
  });

  test("el botón de guardar dibujo funciona sin errores", () => {
    render(<DrawingCanvas />);
    
    const mockClick = jest.fn();
    const originalCreateElement = document.createElement.bind(document);
    
    jest.spyOn(document, "createElement").mockImplementation((tagName: string) => {
      if (tagName === "a") {
        const element = originalCreateElement(tagName);
        element.click = mockClick;
        return element;
      }
      return originalCreateElement(tagName);
    });

    const saveButton = screen.getByRole("button", { name: /Guardar Dibujo/i });
    fireEvent.click(saveButton);

    expect(mockClick).toHaveBeenCalled();
    
    (document.createElement as jest.Mock).mockRestore();
  });

  test("muestra información sobre el spray", () => {
    render(<DrawingCanvas />);
    expect(screen.getByText(/Prueba pintar amarillo sobre azul para crear verde/i)).toBeInTheDocument();
  });
});