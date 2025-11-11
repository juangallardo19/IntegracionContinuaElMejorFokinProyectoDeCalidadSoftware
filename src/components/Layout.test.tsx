import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";

// Mock de los componentes hijos
jest.mock("./Sidebar", () => {
  return function Sidebar() {
    return <div data-testid="sidebar">Sidebar Mock</div>;
  };
});

jest.mock("./Navbar", () => {
  return function Navbar() {
    return <div data-testid="navbar">Navbar Mock</div>;
  };
});

describe("Layout Component", () => {
  test("renderiza el componente sin errores", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  test("renderiza el Sidebar", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  test("renderiza el Navbar", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  test("tiene la estructura correcta con flex display", () => {
    const { container } = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveStyle({ display: "flex" });
  });
});