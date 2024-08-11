'use client';
import { useContext, useState } from 'react';
import styles from './Themes.module.css';
import { ThemeContext } from '../../context/ThemeProvider';

function Themes() {
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className={styles.dropdown} onClick={toggleDropdown}>
        <button className={styles.dropbtn} data-testid="dropdown-content">
          <img
            src={theme === 'light' ? '/assets/dark.png' : '/assets/light.png'}
            alt="theme-icon"
            className={styles.theme_image}
          />
        </button>
        {isDropdownOpen && (
          <div className={styles.theme_container} data-testid="theme-container">
            <img
              src="/assets/dark.png"
              className={styles.theme_image}
              onClick={() => {
                setTheme('dark');
                toggleTheme();
              }}
            />
            <img
              src="/assets/light.png"
              className={styles.theme_image}
              onClick={() => {
                setTheme('light');
                toggleTheme();
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
export default Themes;
