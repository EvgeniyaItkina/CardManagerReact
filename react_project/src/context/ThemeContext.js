import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';

export const ThemeContext = createContext(); // Create a context for the theme

export const ThemeProvider = ({ children }) => { // Detect if the user prefers dark mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); // Set the initial theme mode based on user preference
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode); // Set the data-theme attribute on the HTML element to manage CSS variables
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light')); // Function to toggle between light and dark mode
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              primary: { main: '#1976d2' },
              secondary: { main: '#dc004e' },
              background: { default: '#ffffff', paper: '#f5f5f5' },
              text: { primary: '#000000', secondary: '#555555' },
            }
            : {
              primary: { main: '#90caf9' },
              secondary: { main: '#f48fb1' },
              background: { default: '#121212', paper: '#1d1d1d' },
              text: { primary: '#ffffff', secondary: '#aaaaaa' },
            }),
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); // Custom hook to use the theme context
