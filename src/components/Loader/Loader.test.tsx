import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './Loader';

describe('Loader component', () => {
  test('отображает элемент с классом loader', () => {
    render(<Loader />);

    const loaderElement = screen.getByRole('status');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('loader');
  });
});
