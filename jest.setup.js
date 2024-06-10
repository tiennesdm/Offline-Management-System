// jest.setup.js
import 'whatwg-fetch';

jest.mock('lottie-web', () => ({
    loadAnimation: jest.fn().mockReturnValue({
      play: jest.fn(),
      stop: jest.fn(),
      destroy: jest.fn(),
    }),
    setSubframeRendering: jest.fn(),
    setQuality: jest.fn(),
  }));
  