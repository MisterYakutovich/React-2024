import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ErrorMessage from './ErrorMessage';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
test('отображает ErrorMessage и текст ошибки', () => {
  render(<ErrorMessage />);
  expect(screen.getByText('Error page')).toBeInTheDocument();
});
