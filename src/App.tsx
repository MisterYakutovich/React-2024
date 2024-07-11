import { ReactNode } from 'react';
import Page from './Page';
import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PageItemCart from './pageItemCart/PageItemCart';

function App(): ReactNode {
  const router = createBrowserRouter([
    {
      path: `/`,
      element: <Page />,
    },
    {
      path: `/id`,
      element: <PageItemCart />,
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
