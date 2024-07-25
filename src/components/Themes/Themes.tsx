import { useContext, useState } from 'react';
import dark from '../../assets/dark.png';
import light from '../../assets/light.jpg';
import './Themes.css';
import { ThemeContext } from '../../main';

function Themes() {
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="dropdown" onClick={toggleDropdown}>
        <button className="dropbtn" data-testid="dropdown-content">
          <img
            src={theme === 'light' ? dark : light}
            alt="theme-icon"
            className="theme-image"
          />
        </button>
        {isDropdownOpen && (
          <div className="theme-container">
            <img
              src={dark}
              className="theme-image"
              onClick={() => {
                setTheme('dark');
                toggleTheme();
              }}
            />
            <img
              src={light}
              className="theme-image"
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
