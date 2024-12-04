import { ReactNode } from 'react';
import Page from './Page';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PageItemCart from './components/PageItemCart/PageItemCart';
import PageItem from './PageItem';
import Main from './components/Main/Main';
import Page_404 from './Page_404/Page_404';
import Themes from './components/Themes/Themes';

function App(): ReactNode {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Page />,
    },
    {
      path: '/item',
      element: <PageItem />,
      children: [
        {
          path: '',
          element: <Main personNameSearch={[]} localResult={[]} />,
        },
        {
          path: ':id',
          element: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Main personNameSearch={[]} localResult={[]} />
              <PageItemCart />
            </div>
          ),
        },
      ],
    },
    {
      path: '*',
      element: <Page_404 />,
    },
  ]);
  return (
    <>
      <Themes />
      <RouterProvider router={router} />
    </>
  );
}
export default App;
