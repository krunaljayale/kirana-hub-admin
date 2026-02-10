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

  // 2. The Global Logic (Runs on EVERY page)
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      // A. INJECT GLOBAL TRANSITION STYLE
      // This forces every element (sidebar, cards, text) to morph smoothly
      const style = document.createElement('style');
      style.id = 'theme-transition-style';
      style.innerHTML = `
        *, *::before, *::after {
          transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, color 0.3s ease-in-out !important;
        }
      `;
      // Prevent duplicate tags
      if (!document.getElementById('theme-transition-style')) {
        document.head.appendChild(style);
      }

      // B. DETERMINE DARK MODE
      const isDark = 
        theme === 'dark' || 
        (theme === 'system' && mediaQuery.matches);

      // C. APPLY CLASS
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }

      // D. SAVE PREFERENCE
      localStorage.setItem('theme', theme);

      // E. CLEANUP (Remove transition after 300ms)
      // We remove this so resizing the window later doesn't feel "laggy"
      setTimeout(() => {
        const existingStyle = document.getElementById('theme-transition-style');
        if (existingStyle) existingStyle.remove();
      }, 300);
    };

    applyTheme();

    // Listener for System changes (e.g., Mac auto-switch at sunset)
    if (theme === 'system') {
      mediaQuery.addEventListener('change', applyTheme);
    }

    return () => {
      mediaQuery.removeEventListener('change', applyTheme);
    };
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
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