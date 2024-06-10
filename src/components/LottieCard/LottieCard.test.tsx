// src/components/LottieCard/LottieCard.test.tsx
import React , { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LottieCard from './LottieCard';
import lottie from 'lottie-web';
import '@testing-library/jest-dom';
// Create a mock Response class
global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: 'mocked data' }),
    })
  ) as jest.Mock;
  
  test('renders LottieCard with download button', async () => {
    render(
      <LottieCard
        name="Test Animation"
        description="This is a test description"
        url="http://localhost:3000/data/1717866483449-Polite Chicky.json"
        filename="TestAnimation"
      />
    );
  
    expect(screen.getByText('Test Animation')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
  
    const downloadButton = screen.getByText('Download JSON');
    fireEvent.click(downloadButton);
  
    // Check if fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/data/1717866483449-Polite Chicky.json');
  
    // Additional checks can be done here if necessary
  });
// http://localhost:3000/data/1717866483449-Polite Chicky.json
describe('LottieCard Component', () => {
    const name = 'Polite Chicky';
    const description = 'A polite chicken animation';
    const url = 'http://localhost:3000/data/1717866483449-Polite Chicky.json';
  
    beforeEach(() => {
      act(() => {
        render(<LottieCard name={name} description={description} url={url} />);
      });
    });
  
    it('renders correctly with given props', () => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  
    it('initializes Lottie animation correctly', () => {
      expect(lottie.loadAnimation).toHaveBeenCalledWith(
        expect.objectContaining({
          container: expect.anything(),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: expect.any(Object),
        })
      );
    });
  });

  describe('When Name and description is not', ()=>{
    const name = 'Polite Chicky';
    const description = 'A polite chicken animation';
    const url = 'http://localhost:3000/data/1717866483449-Polite Chicky.json';
  
    beforeEach(() => {
      act(() => {
        render(<LottieCard url={url} />);
      });
    });
     it('handles missing optional props correctly', () => {
      expect(screen.queryByText(name)).not.toBeInTheDocument();
      expect(screen.queryByText(description)).not.toBeInTheDocument();
    });
  })
