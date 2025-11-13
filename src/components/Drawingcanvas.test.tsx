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
    expect(screen.getByText(/Lápiz/i)).toBeInTheDocument();
    expect(screen.getByText(/Spray/i)).toBeInTheDocument();
    expect(screen.getByText(/Borrador/i)).toBeInTheDocument();
  });

  test("muestra la sección de colores", () => {
    render(<DrawingCanvas />);
    expect(screen.getByText(/Color/i)).toBeInTheDocument();
  });

  test("muestra la sección de tamaño del pincel", () => {
    render(<DrawingCanvas />);
    expect(screen.getByText(/Tamaño/i)).toBeInTheDocument();
    expect(screen.getByText(/Pequeño/i)).toBeInTheDocument();
    expect(screen.getByText(/Mediano/i)).toBeInTheDocument();
    expect(screen.getByText(/Grande/i)).toBeInTheDocument();
    expect(screen.getByText(/Muy Grande/i)).toBeInTheDocument();
  });

  test("cambia la herramienta al hacer clic", () => {
    render(<DrawingCanvas />);
    const sprayButton = screen.getByText(/Spray/i);
    fireEvent.click(sprayButton);
    
    // Verificar que la descripción cambió
    expect(screen.getByText(/Spray: Efecto difuminado/i)).toBeInTheDocument();
  });

  test("cambia la herramienta a borrador", () => {
    render(<DrawingCanvas />);
    const eraserButton = screen.getByText(/Borrador/i);
    fireEvent.click(eraserButton);
    
    // Verificar que la descripción cambió
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
    const grandeButton = screen.getByText(/Grande/i);
    fireEvent.click(grandeButton);
    // El botón debería tener la clase btn-primary cuando está seleccionado
    expect(grandeButton.classList.contains("btn-primary")).toBe(true);
  });

  test("el botón de limpiar todo funciona sin errores", () => {
    render(<DrawingCanvas />);
    const clearButton = screen.getByRole("button", { name: /Limpiar Todo/i });
    expect(() => fireEvent.click(clearButton)).not.toThrow();
  });

  test("el botón de guardar dibujo funciona sin errores", () => {
    // Mock de createElement para el link de descarga
    const mockLink = {
      click: jest.fn(),
      download: "",
      href: "",
    };
    jest.spyOn(document, "createElement").mockReturnValue(mockLink as any);

    render(<DrawingCanvas />);
    const saveButton = screen.getByRole("button", { name: /Guardar Dibujo/i });
    fireEvent.click(saveButton);

    expect(mockLink.click).toHaveBeenCalled();
  });

  test("muestra información sobre el spray", () => {
    render(<DrawingCanvas />);
    expect(screen.getByText(/Prueba pintar amarillo sobre azul para crear verde/i)).toBeInTheDocument();
  });
});