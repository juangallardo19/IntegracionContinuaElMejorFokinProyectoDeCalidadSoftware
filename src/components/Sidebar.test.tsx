import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

describe("Sidebar Component", () => {
  test("renderiza el título Mentes Creativas", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(screen.getByText(/Mentes Creativas/i)).toBeInTheDocument();
  });

  test("renderiza el subtítulo Plataforma Educativa", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(screen.getByText(/Plataforma Educativa/i)).toBeInTheDocument();
  });

  test("renderiza el enlace de Inicio", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
  });

  test("renderiza el enlace de Tecnología e Informática", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(screen.getByText(/Tecnología e Informática/i)).toBeInTheDocument();
  });

  test("renderiza el enlace de Educación Artística", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(screen.getByText(/Educación Artística/i)).toBeInTheDocument();
  });

  test("renderiza el enlace de Pensamiento Lógico", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(screen.getByText(/Pensamiento Lógico/i)).toBeInTheDocument();
  });

  test("muestra el footer con 3 Áreas Educativas", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(screen.getByText(/3 Áreas Educativas/i)).toBeInTheDocument();
  });

  test("muestra el texto descriptivo del footer", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(screen.getByText(/Explora las actividades interactivas diseñadas para estudiantes de 4to y 5to grado/i)).toBeInTheDocument();
  });

  test("renderiza todos los íconos de navegación", () => {
    const { container } = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });

  test("tiene la estructura aside correcta", () => {
    const { container } = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const aside = container.querySelector("aside");
    expect(aside).toBeInTheDocument();
  });
});
