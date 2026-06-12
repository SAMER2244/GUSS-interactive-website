import { useState, useEffect } from 'react';
import './DarkModeToggle.css';

export default function DarkModeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
      }
    } catch (e) {
      console.warn('LocalStorage is not accessible:', e);
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch (e) {
        console.warn('LocalStorage is not accessible:', e);
      }
    } else {
      root.removeAttribute('data-theme');
      try {
        localStorage.setItem('theme', 'light');
      } catch (e) {
        console.warn('LocalStorage is not accessible:', e);
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'تفعيل الوضع المظلم' : 'تفعيل الوضع المضيء'}
      title={theme === 'light' ? 'الوضع المظلم' : 'الوضع المضيء'}
    >
      {theme === 'light' ? (
        // Moon icon for dark mode selection
        <svg
          className="theme-icon moon-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Sun icon for light mode selection
        <svg
          className="theme-icon sun-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );
}
