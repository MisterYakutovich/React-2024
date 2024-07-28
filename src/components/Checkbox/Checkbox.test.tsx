import { fireEvent, render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import itemsDetailsReducer from '../../redux/slices/itemsDetailsSlice';
import { PeopleArray } from '../../types/types';
import '@testing-library/jest-dom';

const mockElement: PeopleArray = {
  id: '1',
  name: 'Luke Skywalker',
  url: 'https://swapi.dev/api/people/1/',
  birth_year: '',
  height: '',
  eye_color: '',
  mass: '',
  edited: '',
  created: '',
};

describe('Checkbox', () => {
  const store = configureStore({
    reducer: {
      itemsDetails: itemsDetailsReducer,
    },
  });

  it('должен рендерить Checkbox', () => {
    render(
      <Provider store={store}>
        <Checkbox element={mockElement} />
      </Provider>
    );
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
  });
  it('должен быть отмечен после клика', () => {
    render(
      <Provider store={store}>
        <Checkbox element={mockElement} />
      </Provider>
    );
    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);
    expect(checkboxElement).toBeChecked();
  });
});
