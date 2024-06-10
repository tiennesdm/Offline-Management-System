const lottie = {
    loadAnimation: jest.fn().mockReturnValue({
      play: jest.fn(),
      stop: jest.fn(),
      destroy: jest.fn(),
    }),
    setSubframeRendering: jest.fn(),
    setQuality: jest.fn(),
    // Add more methods as needed
  };
  
  module.exports = lottie;
  