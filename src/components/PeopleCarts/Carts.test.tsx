import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carts from './Carts';

import { ArrSearchResult, PeopleArray } from '../../types/types';
import { Provider } from 'react-redux';
import { makeStore } from '../../redux/store';
import fetchMock from 'jest-fetch-mock';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
];

const mockLocalResult: ArrSearchResult[] = [];

describe('Carts Component', () => {
  test('должен отображать указанное количество карт', () => {
    render(
      <Provider store={store}>
        <Carts localResult={mockLocalResult} items={mockItems} />
      </Provider>
    );
    for (let i = 0; i < 10; i++) {
      const cartItem = screen.getByTestId(`cart-item-${i}`);
      expect(cartItem).toBeInTheDocument();
    }
   // const cartItems = screen.getAllByTestId('cart-item-');

    //expect(cartItems).toHaveLength(mockItems.length);
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
