import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    
    // Add the current theme
    root.classList.add(theme);
    body.classList.add(theme);
    
    // Also set data attribute for better CSS targeting
    root.setAttribute('data-theme', theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setLightTheme = () => {
    setTheme('light');
  };

  const setDarkTheme = () => {
    setTheme('dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setLightTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}