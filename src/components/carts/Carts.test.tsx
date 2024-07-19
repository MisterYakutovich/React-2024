import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carts from './Carts';
import { BrowserRouter } from 'react-router-dom';
import { ArrSearchResult, PeopleArray } from '../../types/types';

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
      <BrowserRouter>
        <Carts localResult={mockLocalResult} items={mockItems} />
      </BrowserRouter>
    );

    const cartItems = screen.getAllByRole('link');
    expect(cartItems).toHaveLength(mockItems.length);
  });

  test('должен отображать сообщение при отсутствии карт', () => {
    render(
      <BrowserRouter>
        <Carts localResult={mockLocalResult} items={[]} />
      </BrowserRouter>
    );

    const message = screen.getByText('No items available');
    expect(message).toBeInTheDocument();
  });
});