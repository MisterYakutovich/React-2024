import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import PageItemCart from './[id]';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { makeStore } from '../../redux/store';
import  {  useRouter  }  from  'next/router' ; 
import  mockRouter  from  'next-router-mock' ; 
//const nextRouterMock = require('next-router-mock')


const store = makeStore();
/*fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});
const store = makeStore();
jest.mock('next/router', () => {
  const { useRouter } = nextRouterMock

  const usePathname = () => {
    const router = useRouter()
    return router.pathname
  }

  const useSearchParams = () => {
    const router = useRouter()
    return new URLSearchParams(router.query)
  }

  return {
    useRouter,
    usePathname,
    useSearchParams
  }
})*/
jest . mock ( 'next/router' ,  ( )  =>  jest . requireActual ( 'next-router-mock' ) ) 
const  ExampleComponent  =  ( { href =  ''  } )  =>  { 
  const  router  =  useRouter ( ) ; 
  return  ( 
    < button  onClick = { ( )  =>  router . push ( href ) } > 
      Текущий маршрут: " { router . asPath } "
     </button > 
  ) ; 
} 
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

  render(
    <Provider store={store}>
     
        <PageItemCart item={undefined} />
     
    </Provider>
  );

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

  render(
    <Provider store={store}>
     
        <PageItemCart item={undefined} />
     
    </Provider>
  );

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

test('должен скрывать компонент при нажатии кнопки "Закрыть"', async () => {
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

  render(
    <Provider store={store}>
     
        <PageItemCart item={undefined} />
     
    </Provider>
  );

  await waitFor(() =>
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  );

  await act(async () => {
    fireEvent.click(screen.getByTestId('close-pageitem'));
  });

  await waitFor(() => {
    expect(screen.queryByTestId('section-container')).not.toBeInTheDocument();
  });
});
