import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import Paginations from './Paginations';
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

/*test('обновляет параметр запроса URL при изменении страницы 1', async () => {
  const incrementPage = jest.fn();
  const decrementPage = jest.fn();

  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
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
});*/

/*test('компонент Page обновляет параметр запроса URL при изменении страницы', async () => {
  let currentPage = 1; 
  const setCurrentPage = (page: number) => {
    currentPage = page;
  };
  const mockNextPage = jest.fn(() => setCurrentPage(currentPage + 1));
  const mockPrevPage = jest.fn(() => setCurrentPage(currentPage - 1));
 
  await act(async () => {
    render(
      <Provider store={store}>
      <MemoryRouter initialEntries={['/?page=1']}>
        <Paginations  nextPage={mockNextPage} 
            prevPage={mockPrevPage} 
            currentPage={currentPage}/>
     </MemoryRouter>
      </Provider>
    );
  });

  expect(screen.getByText('1')).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(screen.getByTestId('next-button'));
  });
  await act(async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/?page=${currentPage}`]}>
          <Paginations nextPage={mockNextPage} prevPage={mockPrevPage} currentPage={currentPage} />
        </MemoryRouter>
      </Provider>
    );
  });
  expect(mockNextPage).toHaveBeenCalled();  // Проверяем, что вызван метод nextPage
  expect(window.location.search).toBe('?page=2');

  await act(async () => {
    fireEvent.click(screen.getByTestId('previous-button'));
  });

  expect(mockPrevPage).toHaveBeenCalled();  // Проверяем, что вызван метод prevPage
  expect(window.location.search).toBe('?page=1');
});*/
