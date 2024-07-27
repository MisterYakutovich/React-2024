import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Download from './Download';
import { store } from '../../redux/store';
import '@testing-library/jest-dom';

//import { JSDOM } from 'jsdom';

/*const mockCharacters = [
  {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    eye_color: 'blue',
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    height: '172',
    mass: '77',
    url: 'https://swapi.dev/api/people/1/',
  },
  {
    name: 'Darth Vader',
    birth_year: '41.9BBY',
    eye_color: 'yellow',
    created: '2014-12-10T15:10:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    height: '202',
    mass: '136',
    url: 'https://swapi.dev/api/people/4/',
  },
];*/

describe('Download Component', () => {
  it('should render the Download component and show the "Download" link', () => {
    window.URL.createObjectURL = jest.fn();
    render(
      <Provider store={store}>
        <Download />
      </Provider>
    );
    const downloadLink = screen.getByText('Download');
    expect(downloadLink).toBeInTheDocument();
  });

  /*it('should generate the correct download URL', () => {
    // Устанавливаем моковые данные в Redux Store
    store.dispatch({
      type: 'SET_SELECTED_CHARACTERS',
      payload: mockCharacters,
    });
    window.URL.createObjectURL = jest.fn();
   
    render(
      <Provider store={store}>
        <Download />
      </Provider>
    );
    const downloadLink = screen.getByRole('link', { name: 'Download' }) as HTMLAnchorElement; 
    // Проверяем, что атрибут href ссылки содержит правильный URL
    expect(downloadLink.href).toContain('blob:');
    expect(downloadLink.href).toContain(`${mockCharacters.length}_people.csv`);
  });*/
});
