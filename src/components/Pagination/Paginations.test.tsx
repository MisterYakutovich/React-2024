import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import Paginations from './Paginations';
import Page from '../../Page';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

test('обновляет параметр запроса URL при изменении страницы', async () => {
  const incrementPage = jest.fn();
  const decrementPage = jest.fn();

  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <Paginations
                nextPage={incrementPage}
                prevPage={decrementPage}
                currentPage={1}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
  });

  expect(screen.getByText('1')).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(screen.getByTestId('next-button'));
  });

  expect(incrementPage).toHaveBeenCalled();

  await act(async () => {
    fireEvent.click(screen.getByTestId('previous-button'));
  });

  expect(decrementPage).toHaveBeenCalled();
});

test('компонент Page обновляет параметр запроса URL при изменении страницы', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    );
  });

  expect(screen.getByText('1')).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(screen.getByTestId('next-button'));
  });

  expect(window.location.search).toBe('?page=2');

  await act(async () => {
    fireEvent.click(screen.getByTestId('previous-button'));
  });

  expect(window.location.search).toBe('?page=1');
});
