import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode); // Устанавливаем атрибут для управления темой
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              // настройки светлой темы
              primary: {
                main: '#1976d2', // основной цвет (например, для AppBar и кнопок)
              },
              secondary: {
                main: '#dc004e', // вторичный цвет (например, для акцентов)
              },
              background: {
                default: '#ffffff', // цвет фона (например, для страницы)
                paper: '#f5f5f5', // цвет фона для бумаги (например, карточек и диалоговых окон)
              },
              text: {
                primary: '#000000', // основной цвет текста
                secondary: '#555555', // вторичный цвет текста
              },
            }
            : {
              // настройки темной темы
              primary: {
                main: '#90caf9', // основной цвет (например, для AppBar и кнопок)
              },
              secondary: {
                main: '#f48fb1', // вторичный цвет (например, для акцентов)
              },
              background: {
                default: '#121212', // цвет фона (например, для страницы)
                paper: '#1d1d1d', // цвет фона для бумаги (например, карточек и диалоговых окон)
              },
              text: {
                primary: '#ffffff', // основной цвет текста
                secondary: '#aaaaaa', // вторичный цвет текста
              },
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

export const useTheme = () => useContext(ThemeContext);
