import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { store } from './redux/store.ts';
import ThemeProvider from './context/ThemeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>
);
//useEffect(() => {

// document.documentElement.style.setProperty(
//   '--main-bg-color',
//   theme === 'light' ? 'var(--main-bg-color-light)' : 'var(--main-bg-color-dark)'
// );
// }, [theme]);

// const rootRef = useRef<HTMLDivElement | null>(null);
// useEffect(() => {
// if (rootRef.current) {

//   rootRef.current.style.backgroundColor =
//     theme === 'light'
//      ? 'var(--main-bg-color-light)'
//       : 'var(--main-bg-color-dark)';
// }
// }, [theme]);
