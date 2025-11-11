import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Content from "./Content";

describe("Content Component", () => {
  test("renderiza sin errores", () => {
    const { container } = render(
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });

  test("contiene un div con clases correctas", () => {
    const { container } = render(
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    );
    const divElement = container.querySelector(".h-full.w-full");
    expect(divElement).toBeInTheDocument();
  });

  test("renderiza el Outlet de React Router", () => {
    const { container } = render(
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});