import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

test('renders ErrorMessage and handles button click', () => {
  render(
    <BrowserRouter>
      <ErrorMessage />
    </BrowserRouter>
  );

  expect(screen.getByText('Error page')).toBeInTheDocument();

  const button = screen.getByText('Go back to search');
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(mockNavigate).toHaveBeenCalledWith('/');
});
