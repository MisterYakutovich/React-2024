import React, {
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { store } from './redux/store.ts';

export interface IContext {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<IContext>({
  theme: 'dark-theme',
  setTheme: () => {},
  toggleTheme: () => {},
});
interface ThemeProviderProps {
  children: ReactNode;
}
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>('light');

  const rootRef = useRef<HTMLDivElement | null>(null);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.style.backgroundColor =
        theme === 'light'
          ? 'var(--main-bg-color-light)'
          : 'var(--main-bg-color-dark)';
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div ref={rootRef}>{children}</div>
    </ThemeContext.Provider>
  );
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>
);
