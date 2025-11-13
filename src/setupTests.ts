// Este archivo extiende el entorno de prueba de Jest.

import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfill para TextEncoder/TextDecoder
Object.assign(global, { TextEncoder, TextDecoder });

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({ 
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
  },
  writable: true,
});

Object.defineProperty(document, "documentElement", {
  value: {
    classList: {
      toggle: jest.fn(),
      add: jest.fn(),
      remove: jest.fn(),
    },
  },
  writable: true,
});

Object.defineProperty(document, "dispatchEvent", {
  value: jest.fn(),
});

// Mock de HTMLMediaElement para audio/video
window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = jest.fn();
window.HTMLMediaElement.prototype.load = jest.fn();

// Suprimir warnings específicos de consola para mantener limpia la salida
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args: any[]) => {
    // Ignorar errores específicos que no podemos controlar
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Not implemented: HTMLMediaElement') ||
       args[0].includes('Error: Not implemented') ||
       args[0].includes('React does not recognize the `whileHover`') ||
       args[0].includes('React does not recognize the `whileTap`') ||
       args[0].includes('not wrapped in act(...)'))
    ) {
      return;
    }

    originalError.call(console, ...args);
  };

  console.warn = (...args: any[]) => {
    // Ignorar warnings de framer-motion
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('whileHover') ||
       args[0].includes('whileTap'))
    ) {
      return;
    }

    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});