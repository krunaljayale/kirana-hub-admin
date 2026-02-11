"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ThemeOption = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeOption>('system');
  const [mounted, setMounted] = useState(false);

  // 1. Initialize from LocalStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeOption;
    if (savedTheme) {
      setThemeState(savedTheme);
    }
    setMounted(true);
  }, []);

  // 2. The Global Logic (Syncs State with DOM)
  useEffect(() => {
    // Only run on client
    if (!mounted) return;

    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const isDark = 
        theme === 'dark' || 
        (theme === 'system' && mediaQuery.matches);

      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      localStorage.setItem('theme', theme);
    };

    applyTheme();

    // Listener for System changes
    if (theme === 'system') {
      mediaQuery.addEventListener('change', applyTheme);
      return () => mediaQuery.removeEventListener('change', applyTheme);
    }
  }, [theme, mounted]);

  // 3. The "Smooth Switch" Wrapper
  // This ONLY runs when the user manually changes the theme.
  const changeTheme = (newTheme: ThemeOption) => {
    // A. Inject a temporary class to force smooth transitions on EVERYTHING
    document.documentElement.classList.add('transition-colors', 'duration-300', 'ease-in-out');
    
    // B. Update the state (triggering the useEffect above)
    setThemeState(newTheme);
    
    // C. Clean up the transition class after the animation finishes
    // This prevents "laggy" resizing later on
    setTimeout(() => {
      document.documentElement.classList.remove('transition-colors', 'duration-300', 'ease-in-out');
    }, 300);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}