import { ReactNode, createContext, useEffect, useState } from 'react';

export interface ThemeProviderProps {
  children: ReactNode;
}
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
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--main-bg-color',
      theme === 'light'
        ? 'var(--main-bg-color-light)'
        : 'var(--main-bg-color-dark)'
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export default ThemeProvider;
