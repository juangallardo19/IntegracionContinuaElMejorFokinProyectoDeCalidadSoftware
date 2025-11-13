// setupTests.ts
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill para TextEncoder/TextDecoder (necesario para react-router-dom)
global.TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Mock global de Audio
class MockAudio {
  volume = 1;
  muted = false;
  loop = false;
  preload = "";
  src = "";
  currentTime = 0;
  duration = 0;
  paused = true;
  
  play = jest.fn(() => Promise.resolve());
  pause = jest.fn();
  load = jest.fn();
  addEventListener = jest.fn();
  removeEventListener = jest.fn();
}

(global as any).Audio = MockAudio;

// Silenciar warnings específicos de console.error
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    const message = typeof args[0] === 'string' ? args[0] : '';
    
    // Silenciar warnings de HTMLMediaElement
    if (message.includes('Not implemented: HTMLMediaElement')) {
      return;
    }
    
    // Silenciar warnings de act()
    if (message.includes('not wrapped in act')) {
      return;
    }
    
    // Silenciar warnings de whileHover/whileTap de framer-motion
    if (message.includes('whileHover') || message.includes('whileTap')) {
      return;
    }
    
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

export {};