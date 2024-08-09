import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carts from './Carts';

import { ArrSearchResult, PeopleArray } from '../../types/types';
import { Provider } from 'react-redux';
import { makeStore } from '../../redux/store';
import fetchMock from 'jest-fetch-mock';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import CartItem from '../CartItem/CartItem';
const store = makeStore();
const customFetchFn: (
  input: RequestInfo,
  init?: RequestInit
) => Promise<Response> = async (input, init) => {
  try {
    const response = await fetch(input, init);
    return response;
  } catch (error) {
    console.error('Error in custom fetchFn:', error);
    throw error;
  }
};

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.dev/api/people/',
    fetchFn: customFetchFn,
  }),
  endpoints: (builder) => ({
    getPeople: builder.query({
      query: (page) => `?page=${page}`,
    }),
    getPeopleId: builder.query({
      query: (id) => `${id}/`,
    }),
    getSearch: builder.query({
      query: (name) => `?search=${name}`,
    }),
  }),
});
const mockItems: PeopleArray[] = [
  {
    id: '1',
    url: 'https://swapi.dev/api/people/1/',
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    height: '172',
    eye_color: 'blue',
    mass: '77',
    edited: '2014-12-20T21:17:56.891000Z',
    created: '2014-12-09T13:50:51.644000Z',
  },
  {
    id: '2',
    url: 'https://swapi.dev/api/people/2/',
    name: 'C-3PO',
    birth_year: '112BBY',
    height: '167',
    eye_color: 'yellow',
    mass: '75',
    edited: '2014-12-20T21:17:50.309000Z',
    created: '2014-12-10T15:10:51.357000Z',
  },
  {
    id: '3',
    name: 'R2-D2',
    height: '96',
    mass: '32',
    created: '2014-12-10T15:11:50.376000Z',
    edited: '2014-12-20T21:17:50.311000Z',
    url: 'https://swapi.dev/api/people/3/',
    eye_color: 'red',
    birth_year: '33BBY',
  },
  {
    id: '4',
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    created: '2014-12-10T15:18:20.704000Z',
    edited: '2014-12-20T21:17:50.313000Z',
    url: 'https://swapi.dev/api/people/4/',
  },
  {
    id: '5',
    name: 'Leia Organa',
    height: '150',
    mass: '49',
    eye_color: 'brown',
    birth_year: '19BBY',
    created: '2014-12-10T15:20:09.791000Z',
    edited: '2014-12-20T21:17:50.315000Z',
    url: 'https://swapi.dev/api/people/5/',
  },
  {
    id: '6',
    name: 'Owen Lars',
    height: '178',
    mass: '120',
    eye_color: 'blue',
    birth_year: '52BBY',
    created: '2014-12-10T15:52:14.024000Z',
    edited: '2014-12-20T21:17:50.317000Z',
    url: 'https://swapi.dev/api/people/6/',
  },
  {
    id: '7',
    name: 'Beru Whitesun lars',
    height: '165',
    mass: '75',
    eye_color: 'blue',
    birth_year: '47BBY',
    created: '2014-12-10T15:53:41.121000Z',
    edited: '2014-12-20T21:17:50.319000Z',
    url: 'https://swapi.dev/api/people/7/',
  },
  {
    id: '8',
    name: 'R5-D4',
    height: '97',
    mass: '32',
    eye_color: 'red',
    birth_year: 'unknown',
    created: '2014-12-10T15:57:50.959000Z',
    edited: '2014-12-20T21:17:50.321000Z',
    url: 'https://swapi.dev/api/people/8/',
  },
  {
    id: '9',
    name: 'Biggs Darklighter',
    height: '183',
    mass: '84',
    eye_color: 'brown',
    birth_year: '24BBY',
    created: '2014-12-10T15:59:50.509000Z',
    edited: '2014-12-20T21:17:50.323000Z',
    url: 'https://swapi.dev/api/people/9/',
  },
  {
    id: '10',
    name: 'Obi-Wan Kenobi',
    height: '182',
    mass: '77',
    eye_color: 'blue-gray',
    birth_year: '57BBY',
    created: '2014-12-10T16:16:29.192000Z',
    edited: '2014-12-20T21:17:50.325000Z',
    url: 'https://swapi.dev/api/people/10/',
  },
];

const mockLocalResult: ArrSearchResult[] = [];

describe('Carts Component', () => {
  test('должен отображать указанное количество карт', () => {
    render(
      <Provider store={store}>
        {mockItems.map((item, index) => (
          <CartItem key={index} element={item} index={index} />
        ))}
      </Provider>
    );

    for (let i = 0; i < 10; i++) {
      const cartItem = screen.getByTestId(`cart-item-${i}`);
      expect(cartItem).toBeInTheDocument();
    }
  });

  test('должен отображать сообщение при отсутствии карт', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ results: [] }));
    render(
      <Provider store={store}>
        <Carts localResult={mockLocalResult} items={[]} />
      </Provider>
    );

    const message = screen.getByText('No items available');
    expect(message).toBeInTheDocument();
  });
});
