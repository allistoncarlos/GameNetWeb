import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const handleSystemThemeChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Verificar se há tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Definir tema inicial com base na preferência do sistema
      setTheme(prefersDarkQuery.matches ? 'dark' : 'light');
    }

    // Adicionar listener para mudanças na preferência do sistema
    prefersDarkQuery.addEventListener('change', handleSystemThemeChange);

    // Limpar o listener ao desmontar o componente
    return () => {
      prefersDarkQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    // Aplicar tema ao documento
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Salvar tema no localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

