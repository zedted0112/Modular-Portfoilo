import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // theme = color scheme (purpleHaze, greenGlass, etc.)
  // colorMode = 'light' or 'dark'
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') || 'light'
  );
  const [colorMode, setColorMode] = useState(() =>
    localStorage.getItem('colorMode') || 'dark'
  );

  useEffect(() => {
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('colorMode', colorMode);
  }, [colorMode]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colorMode, setColorMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 