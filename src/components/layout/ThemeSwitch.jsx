import { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import "../../styles/Switches.css";

const ThemeSwitch = () => {
  const [darkMode, setDarkMode] = useLocalStorage("user_pref_dark_ui", false);

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.setAttribute("data-ui-mode", "dark");
    } else {
      root.setAttribute("data-ui-mode", "light");
    }
  }, [darkMode]);

  const handleThemeChange = (isDark, e) => {
    e.stopPropagation();

    if (darkMode !== isDark) {
      setDarkMode(isDark);
    }
  };

  return (
    <div className="segmented-control">
      <div
        className={`segmented-control__option ${!darkMode ? "active" : ""}`}
        onClick={(e) => handleThemeChange(false, e)}
        title="Light Mode"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </div>

      <div
        className={`segmented-control__option ${darkMode ? "active" : ""}`}
        onClick={(e) => handleThemeChange(true, e)}
        title="Dark Mode"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </div>
    </div>
  );
};

export default ThemeSwitch;
