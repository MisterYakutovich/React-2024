import { render } from '@testing-library/react';
import Page_404 from '../pag/404';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
test('renders 404 page', () => {
  const { getByText } = render(<Page_404 />);
  const page404Element = getByText(/Page_404/i);
  expect(page404Element).toBeInTheDocument();
});
