import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  // Checks user storage or OS preference on first boot
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
      setIsLight(true);
      document.body.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
      setIsLight(false);
    } else {
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
      setIsLight(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--color-surface)] border border-[var(--color-surface-border)] hover:bg-[var(--color-surface-elevated)] active:scale-95 transition-all cursor-pointer popover-shadow"
      aria-label="Toggle system theme"
    >
      {isLight ? (
        <>
          <Moon size={14} className="text-[var(--color-accent)]" />
          <span className="text-[var(--color-text-secondary)]">Dark Mode</span>
        </>
      ) : (
        <>
          <Sun size={14} className="text-amber-400" />
          <span className="text-[var(--color-text-secondary)]">Light Mode</span>
        </>
      )}
    </button>
  );
}
