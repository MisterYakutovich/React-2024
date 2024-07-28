import { ReactNode } from 'react';
import Page from './Page';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PageItemCart from './components/PageItemCart/PageItemCart';
import PageItem from './PageItem';
import Main from './components/Main/Main';
import Page_404 from './Page_404/Page_404';

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
        element: (
          <Main personNameSearch={[]} localResult={[]} currentPage={1} />
        ),
      },
      {
        path: ':id',
        element: (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Main personNameSearch={[]} localResult={[]} currentPage={1} />

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
function App(): ReactNode {
  return <RouterProvider router={router} />;
}
export default App;
