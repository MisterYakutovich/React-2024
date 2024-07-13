import { ReactNode } from 'react';
import Page from './Page';
import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PageItemCart from './components/PageItemCart/PageItemCart';
import PageItem from './PageItem';

function App(): ReactNode {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Page />,
    },
    {
      path: '/',
      element: <PageItem />,
      children: [
        {
          path: '/:id/',
          element: <PageItemCart />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
