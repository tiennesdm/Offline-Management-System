// LottieUploadForm.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../redux/store';
import LottieUploadForm from './LottieUploadForm';

global.alert = jest.fn();

describe('LottieUploadForm', () => {
    const renderWithProvider = (ui) => {
        return render(<Provider store={store}>{ui}</Provider>);
      };
  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  test('renders the form with initial elements', () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LottieUploadForm />
        </PersistGate>
      </Provider>
    );
    expect(screen.getByText(/Upload New Lottie/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/File/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  test('shows error on invalid JSON format', async () => {
    renderWithProvider(<LottieUploadForm />);

    const fileInput = screen.getByLabelText(/file/i);
    const nameInput = screen.getByLabelText(/name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /upload/i });

    // Mock invalid file input change
    const invalidFile = new File(['{invalid json}'], 'invalid.json', { type: 'application/json' });
    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    // Mock form inputs
    fireEvent.change(nameInput, { target: { value: 'Invalid Lottie' } });
    fireEvent.change(descriptionInput, { target: { value: 'This is an invalid Lottie animation.' } });

    // Submit form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Invalid JSON format.');
    });
  });

  test('submits form with valid data', async () => {
    const validFile = new File(['{"name": "Test"}'], 'valid.json', { type: 'application/json' });
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LottieUploadForm />
        </PersistGate>
      </Provider>
    );
    const fileInput = screen.getByLabelText(/File/i);
    const nameInput = screen.getByLabelText(/Name/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    fireEvent.change(fileInput, { target: { files: [validFile] } });
    fireEvent.change(nameInput, { target: { value: 'Test Lottie' } });
    fireEvent.change(descriptionInput, { target: { value: 'This is a test Lottie animation.' } });
    fireEvent.submit(screen.getByRole('button', { name: /Upload/i }));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Invalid JSON format.');
    });
  });
});
