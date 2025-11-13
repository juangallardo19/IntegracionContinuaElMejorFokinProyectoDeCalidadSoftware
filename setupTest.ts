// Mock global de Audio para todos los tests
class MockAudio {
  volume = 1;
  muted = false;
  loop = false;
  preload = "";
  src = "";
  
  play = jest.fn(() => Promise.resolve());
  pause = jest.fn();
  load = jest.fn();
  addEventListener = jest.fn();
  removeEventListener = jest.fn();
}

// Reemplazar Audio global
(global as any).Audio = MockAudio;
(global as any).HTMLMediaElement = MockAudio;

// Mock de HTMLMediaElement.prototype.play para evitar warnings
if (typeof window !== 'undefined') {
  Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value: jest.fn(() => Promise.resolve()),
  });
  
  Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    value: jest.fn(),
  });
  
  Object.defineProperty(window.HTMLMediaElement.prototype, 'load', {
    configurable: true,
    value: jest.fn(),
  });
}

export {};