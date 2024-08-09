import { render, screen, fireEvent, act } from '@testing-library/react';

import '@testing-library/jest-dom';
import Paginations from './Paginations';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { makeStore } from '../../redux/store';

const store = makeStore();
fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

test('обновляет параметр запроса URL при изменении страницы', async () => {
  const incrementPage = jest.fn();
  const decrementPage = jest.fn();

  await act(async () => {
    render(
      <Provider store={store}>
        {<Paginations nextPage={incrementPage} prevPage={decrementPage} />}
      </Provider>
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
