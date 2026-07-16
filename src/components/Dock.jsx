import { useState, useEffect, useRef } from 'react';
import { User, FolderCode, FileText, Mail, Terminal, Notebook, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

// Premium Theme-Reactive App Tile Styling
const getAppIconStyle = (isLight) => {
  // Now uses CSS variables so the border/backgrounds flip automatically
  return {
    wrapper: `w-[44px] h-[44px] flex items-center justify-center rounded-[12px]
              bg-[var(--color-surface-inactive)] border border-[var(--color-surface-border)]
              shadow-[0_4px_10px_rgba(0,0,0,0.1)]
              transition-all duration-250`,
    icon: isLight ? 'text-[var(--color-accent)]' : 'text-white'
  };
};

export default function Dock({ windows, toggleWindow, bringToFront }) {
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0, id: null });
  const [isLight, setIsLight] = useState(false);
  const dockRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) setIsLight(true);
  }, []);

  const handleThemeToggle = (e) => {
    const willBeLight = !isLight;
    const toggle = () => {
      document.body.classList.toggle('light-theme', willBeLight);
      localStorage.setItem('theme', willBeLight ? 'light' : 'dark');
      setIsLight(willBeLight);
    };

    if (!document.startViewTransition) return toggle();

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(toggle);
    transition.ready.then(() => {
      document.documentElement.animate({
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
      }, { duration: 600, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" });
    });
  };

  const DockIcon = ({ id, icon: Icon, label, badge }) => {
    const win = windows.find(w => w.id === id);
    if (win && win.type === 'widget') return null;

    const isOpen = win?.isOpen;
    const isMinimized = win?.isMinimized;
    const { wrapper, icon: iconColor } = getAppIconStyle(isLight);

    const handleClick = () => {
      if (!isOpen) { toggleWindow(id, 'isOpen', true); bringToFront(id); }
      else if (isMinimized) { toggleWindow(id, 'isMinimized', false); bringToFront(id); }
      else {
        const activeWindows = windows.filter(w => w.type === 'window' && w.isOpen && !w.isMinimized);
        const maxZ = Math.max(...activeWindows.map(w => w.zIndex || 0), 0);
        win.zIndex === maxZ ? toggleWindow(id, 'isMinimized', true) : bringToFront(id);
      }
    };

    return (
      <div className="relative group flex flex-col items-center justify-center">
        <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all bg-[var(--color-surface-dark)] border border-[var(--color-surface-border)] text-[var(--color-text)] text-[11px] px-3 py-1.5 rounded-md pointer-events-none z-[99999] shadow-lg whitespace-nowrap">
          {label}
        </span>

        <motion.button
          whileHover={{ scale: 1.15, y: -6 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleClick}
          className="relative flex items-center justify-center w-[48px] h-[48px] transition-all cursor-pointer"
        >
          <div className={`${wrapper} group-hover:border-[var(--color-accent)]`}>
            <Icon size={22} strokeWidth={2} className={`${iconColor} transition-colors duration-250`} />
          </div>

          {badge > 0 && (
            <div className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 bg-[#FF3B30] text-white text-[10px] font-semibold rounded-full flex items-center justify-center border border-black/20 shadow-sm z-10">
              {badge}
            </div>
          )}
        </motion.button>

        {isOpen && (
          <div className="absolute -bottom-2 flex justify-center items-center h-2">
            <div className={`rounded-full transition-all ${isMinimized ? 'w-[4px] h-[4px] bg-[var(--color-text-tertiary)]' : 'w-[4px] h-[4px] bg-[var(--color-text)] shadow-[0_0_4px_var(--color-text)] opacity-80'}`} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={dockRef} className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[99999] pointer-events-auto">
      <div className="px-3.5 py-2.5 bg-[var(--color-surface-inactive)] backdrop-blur-2xl border border-[var(--color-surface-border)] rounded-[22px] flex items-end gap-3 shadow-[0_24px_50px_rgba(0,0,0,0.1)] ring-1 ring-black/5 transition-colors duration-250">
        <DockIcon id="about" icon={User} label="About Me" />
        <DockIcon id="projects" icon={FolderCode} label="Projects" />
        <DockIcon id="resume" icon={FileText} label="Resume" />
        <DockIcon id="notepad" icon={Notebook} label="Notes" />
        <DockIcon id="contact" icon={Mail} label="Contact" />
        <div className="w-[1px] h-9 bg-[var(--color-surface-border)] rounded-full mx-1 align-middle self-center transition-colors duration-250" />
        <DockIcon id="terminal" icon={Terminal} label="Terminal" />

        <div className="relative group flex flex-col items-center justify-center ml-1">
          <motion.button
            whileHover={{ scale: 1.15, y: -6 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleThemeToggle}
            className="relative flex items-center justify-center w-[48px] h-[48px] transition-all cursor-pointer"
          >
            <div className="w-[44px] h-[44px] flex items-center justify-center rounded-[12px] bg-[var(--color-surface-border)] border border-[var(--color-surface-border)] hover:border-[var(--color-accent)] transition-colors duration-250">
              {isLight ? <Moon size={22} className="text-[var(--color-accent)]" /> : <Sun size={22} className="text-amber-400" />}
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
