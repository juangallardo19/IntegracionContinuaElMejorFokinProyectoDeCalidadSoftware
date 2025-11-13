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

jest.mock("./BackgroundMusic", () => {
  return function BackgroundMusic() {
    return <div data-testid="background-music">BackgroundMusic Mock</div>;
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
    expect(screen.getByTestId("background-music")).toBeInTheDocument();
  });

  test("renderiza el Sidebar", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  test("renderiza el BackgroundMusic", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(screen.getByTestId("background-music")).toBeInTheDocument();
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