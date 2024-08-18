import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './Header';
import ErrorPage from './ErrorPage';
import ControllerForm from './ControllerForm';
import UncontrollForm from './UncontrollForm';
import { useDispatch } from 'react-redux';
import { updatePhoto } from './redux/slices/formslice';
import { createContext } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'controller/form_1',
    element: <ControllerForm />,
  },
  {
    path: 'uncontroller/form_2',
    element: <UncontrollForm />,
  },
]);
export interface IContext {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const ThemeContext = createContext<null | IContext>(null);
export const ItemsProvaider = ThemeContext.Provider;
function App() {
  const dispatch = useDispatch();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target!.result as string;
      dispatch(updatePhoto(base64Image));
    };
    reader.readAsDataURL(file);
  };

  return (
    <ItemsProvaider value={{ handleImageChange }}>
      <RouterProvider router={router} />
    </ItemsProvaider>
  );
}

export default App;
