import { render } from '@testing-library/react';
import Page_404 from '../pages/404';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

test('renders 404 page', () => {
  const { getByText } = render(
    <BrowserRouter>
      {' '}
      <Page_404 />
    </BrowserRouter>
  );
  const page404Element = getByText(/Page_404/i);
  expect(page404Element).toBeInTheDocument();
});
