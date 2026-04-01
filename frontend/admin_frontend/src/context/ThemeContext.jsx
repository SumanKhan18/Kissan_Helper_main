import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    // Apply theme immediately on mount to prevent flash
    const root = window.document.documentElement;
    const body = document.body;
    let appliedTheme = saved;
    if (saved === 'system') {
      appliedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    root.classList.add(appliedTheme);
    body.classList.add(appliedTheme);
    root.setAttribute('data-theme', appliedTheme);
    body.setAttribute('data-theme', appliedTheme);
    root.style.colorScheme = appliedTheme;
    return saved;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const body = document.body;
    
    // Remove all theme classes first
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    
    // Determine the actual theme to apply
    let appliedTheme = theme;
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      appliedTheme = systemTheme;
    }
    
    // Apply the theme class - this is what Tailwind uses for dark mode
    root.classList.add(appliedTheme);
    body.classList.add(appliedTheme);
    
    // Also set data-theme attribute for additional styling
    root.setAttribute('data-theme', appliedTheme);
    body.setAttribute('data-theme', appliedTheme);
    
    // Set color-scheme CSS property for better browser support
    root.style.colorScheme = appliedTheme;
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Listen for system theme changes if in system mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        body.classList.remove('light', 'dark');
        root.classList.add(newTheme);
        body.classList.add(newTheme);
        root.setAttribute('data-theme', newTheme);
        body.setAttribute('data-theme', newTheme);
        root.style.colorScheme = newTheme;
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
