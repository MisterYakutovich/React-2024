import { render } from '@testing-library/react';
import Seach from './Seach';
import '@testing-library/jest-dom';
//import { BrowserRouter } from 'react-router-dom';

test('extracting value from local storage when component mounts', () => {
  const savedSearchLocal = JSON.stringify('C-3PO');
  localStorage.setItem('search', savedSearchLocal);
  const { getByPlaceholderText } = render(
    <BrowserRouter>
      {' '}
      <Seach
        enterHandler={function (): void {
          throw new Error('Function not implemented.');
        }}
        savedSearchLocal={''}
      />
    </BrowserRouter>
  );

  const searchInput = getByPlaceholderText('Enter the name of the person');
  expect(searchInput).toBeInTheDocument();

  expect(localStorage.getItem('search')).toBe(savedSearchLocal); //
});
test('extracting value from local storage when component mounts', () => {
  const enterHandlerMock = jest.fn();
  const savedSearchLocal = JSON.stringify('R2-D2');
  localStorage.setItem('search', savedSearchLocal);
  const { getByPlaceholderText } = render(
    <Seach enterHandler={enterHandlerMock} savedSearchLocal={'R2-D2'} />
  );
  expect(
    getByPlaceholderText('Enter the name of the person').getAttribute('value')
  ).toBe('R2-D2');
});
