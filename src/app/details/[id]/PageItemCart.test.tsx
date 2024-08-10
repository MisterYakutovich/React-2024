import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageItemCart from '../../../pag/cartid/[id]';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../redux/services/api_people', () => ({
  useGetPeopleIdQuery: jest.fn().mockReturnValue({
    isLoading: false,
    isError: false,
  }),
}));
test('должен отображать индикатор загрузки при извлечении данных', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      id: '1',
      name: 'Luke Skywalker',
      height: '172',
      birth_year: '19BBY',
      eye_color: 'blue',
      mass: '77',
      edited: '2014-12-20T21:17:56.891000Z',
      created: '2014-12-09T13:50:51.644000Z',
      url: 'https://swapi.dev/api/people/1/',
    })
  );

  render(<PageItemCart item={undefined} />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  );
});

test('должен корректно отображать подробные данные карты', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      id: '1',
      name: 'Luke Skywalker',
      height: '172',
      birth_year: '19BBY',
      eye_color: 'blue',
      mass: '77',
      edited: '2014-12-20T21:17:56.891000Z',
      created: '2014-12-09T13:50:51.644000Z',
      url: 'https://swapi.dev/api/people/1/',
    })
  );

  render(<PageItemCart item={undefined} />);

  await waitFor(() =>
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  );

  expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  expect(screen.getByText('Height:172')).toBeInTheDocument();
  expect(screen.getByText('Birth_year:19BBY')).toBeInTheDocument();
  expect(screen.getByText('Eye_color:blue')).toBeInTheDocument();
  expect(screen.getByText('Mass:77')).toBeInTheDocument();
  expect(
    screen.getByText('Edited:2014-12-20T21:17:56.891000Z')
  ).toBeInTheDocument();
  expect(
    screen.getByText('Created:2014-12-09T13:50:51.644000Z')
  ).toBeInTheDocument();
});

const mockItem = {
  id: '1',
  name: 'Luke Skywalker',
  height: '172',
  birth_year: '19BBY',
  eye_color: 'blue',
  mass: '77',
  edited: '2014-12-20T21:17:56.891000Z',
  created: '2014-12-09T13:50:51.644000Z',
  url: 'https://swapi.dev/api/people/1/',
};

it('должен скрывать компонент при нажатии на "Закрыть"', () => {
  render(<PageItemCart item={mockItem} />);

  const closeButton = screen.getByTestId('close-pageitem');

  expect(closeButton).toBeInTheDocument();

  fireEvent.click(closeButton);

  expect(useRouter().push).toHaveBeenCalledWith('/');
});
