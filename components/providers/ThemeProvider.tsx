"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme, e?: React.MouseEvent) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("system");

  // 1. Initial Load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
    }
  }, []);

  // 2. 🚀 THE FIX: Real-Time OS Theme Listener
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // ONLY trigger if the user's preference is actually set to "system"
      if (theme === "system") {
        const applyTheme = () => {
          const root = window.document.documentElement;
          root.classList.remove("light", "dark");
          root.classList.add(e.matches ? "dark" : "light");
        };

        if (!('startViewTransition' in document)) {
          applyTheme();
          return;
        }

        // If the OS triggers the change, erupt the ripple from the center of the screen!
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;
        const endRadius = Math.hypot(window.innerWidth, window.innerHeight);

        const root = document.documentElement;
        root.style.setProperty('--click-x', `${x}px`);
        root.style.setProperty('--click-y', `${y}px`);
        root.style.setProperty('--click-r', `${endRadius}px`);

        // @ts-ignore
        document.startViewTransition(() => {
          applyTheme();
        });
      }
    };

    // Attach the listener
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme]); // Re-run this effect if the user changes their theme state

  // 3. Manual Click Handler
  const setTheme = (newTheme: Theme, e?: React.MouseEvent) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);

    const applyTheme = () => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");

      if (newTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        root.classList.add(systemTheme);
        return;
      }
      root.classList.add(newTheme);
    };

    if (!('startViewTransition' in document)) {
      applyTheme();
      return;
    }

    const x = e ? e.clientX : window.innerWidth / 2;
    const y = e ? e.clientY : window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const root = document.documentElement;
    root.style.setProperty('--click-x', `${x}px`);
    root.style.setProperty('--click-y', `${y}px`);
    root.style.setProperty('--click-r', `${endRadius}px`);

    // @ts-ignore
    document.startViewTransition(() => {
      applyTheme();
    });
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};