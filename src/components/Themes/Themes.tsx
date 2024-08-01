import { useContext, useState } from 'react';
import dark from '../../assets/dark.png';
import light from '../../assets/light.jpg';
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
            src="" //'theme === 'light' ? dark : light'
            alt="theme-icon"
            className={styles.theme_image}
          />
        </button>
        {isDropdownOpen && (
          <div className={styles.theme_container}>
            <img
              src="" //{dark}
              className={styles.theme_image}
              onClick={() => {
                setTheme('dark');
                toggleTheme();
              }}
            />
            <img
              src="" //{light}
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
