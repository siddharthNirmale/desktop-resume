import { useState, useEffect, useRef } from 'react';
import { User, FolderCode, FileText, Mail, Terminal, Notebook, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

// Premium Unified 3D App Tile Styling
const getAppIconStyle = (id) => {
  // The premium dark graphite base you liked from the Terminal
  const baseBg = 'bg-gradient-to-b from-[#3A3A3C] to-[#1C1C1E]';

  switch (id) {
    case 'about':
      return { bg: baseBg, text: 'text-[#0A84FF]' }; // iOS Blue
    case 'projects':
      return { bg: baseBg, text: 'text-[#FF9F0A]' }; // iOS Orange
    case 'resume':
      return { bg: baseBg, text: 'text-[#BF5AF2]' }; // iOS Purple
    case 'notepad':
      return { bg: baseBg, text: 'text-[#FFD60A]' }; // iOS Yellow
    case 'contact':
      return { bg: baseBg, text: 'text-[#5AC8FA]' }; // iOS Cyan
    case 'terminal':
      return { bg: baseBg, text: 'text-[#30D158]' }; // Terminal Green
    default:
      return { bg: baseBg, text: 'text-white' };
  }
};

export default function Dock({ windows, toggleWindow, bringToFront }) {
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0, id: null });
  const [isLight, setIsLight] = useState(false);
  const dockRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
      setIsLight(true);
      document.body.classList.add('light-theme');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setMenu(prev => ({ ...prev, show: false }));
      }
    };
    if (menu.show) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menu.show]);

  // 🌊 View Transition Theme Toggle 🌊
  const handleThemeToggle = (e) => {
    const willBeLight = !isLight;

    const toggle = () => {
      if (willBeLight) {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        setIsLight(true);
      } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
        setIsLight(false);
      }
    };

    if (!document.startViewTransition) {
      toggle();
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(toggle);

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  const DockIcon = ({ id, icon: Icon, label, badge }) => {
    const win = windows.find(w => w.id === id);
    if (win && win.type === 'widget') return null;

    const isOpen = win?.isOpen;
    const isMinimized = win?.isMinimized;
    const { bg, text } = getAppIconStyle(id);

    const handleClick = () => {
      if (!isOpen) {
        toggleWindow(id, 'isOpen', true);
        bringToFront(id);
      } else if (isMinimized) {
        toggleWindow(id, 'isMinimized', false);
        bringToFront(id);
      } else {
        const activeWindows = windows.filter(w => w.type === 'window' && w.isOpen && !w.isMinimized);
        const maxZ = Math.max(...activeWindows.map(w => w.zIndex || 0), 0);

        if (win.zIndex === maxZ) {
          toggleWindow(id, 'isMinimized', true);
        } else {
          bringToFront(id);
        }
      }
    };

    return (
      <div className="relative group flex flex-col items-center justify-center">
        {/* macOS Style Crisp Dynamic Tooltip */}
        <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all duration-150 delay-100 transform scale-95 group-hover:scale-100 bg-[var(--color-surface-dark)] backdrop-blur-md border border-[var(--color-surface-border)] text-white text-[11px] font-medium px-3 py-1.5 rounded-md pointer-events-none z-[99999] shadow-lg whitespace-nowrap">
          {label}
        </span>

        <motion.button
          whileHover={{ scale: 1.15, y: -6 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleClick}
          onContextMenu={(e) => {
            e.preventDefault();
            setMenu({ show: true, x: e.clientX, y: e.clientY - 150, id });
          }}
          className="relative flex items-center justify-center w-[48px] h-[48px] transition-all duration-200 cursor-pointer"
        >
          {/* The uniform 3D Squircle wrapper */}
          <div className={`w-[44px] h-[44px] flex items-center justify-center rounded-[12px] ${bg} ${text} shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_10px_rgba(0,0,0,0.25)] ring-1 ring-black/20`}>
            <Icon size={22} strokeWidth={2} className="drop-shadow-sm" />
          </div>

          {/* Notification Badge */}
          {badge > 0 && (
            <div className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 bg-[#FF3B30] text-white text-[10px] font-semibold rounded-full flex items-center justify-center border border-black/20 shadow-sm z-10">
              {badge}
            </div>
          )}
        </motion.button>

        {/* Active Indicators */}
        {isOpen && (
          <div className="absolute -bottom-2 flex justify-center items-center h-2">
            <div className={`rounded-full transition-all duration-300 ${isMinimized
                ? 'w-[4px] h-[4px] bg-[var(--color-text-tertiary)]'
                : 'w-[4px] h-[4px] bg-[var(--color-text)] shadow-[0_0_4px_var(--color-text)] opacity-80'
              }`} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={dockRef} className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[99999] pointer-events-auto custom-dock-container">
      {/* Container utilizing dynamic OS surface variables for flawless theme switching */}
      <div className="px-3.5 py-2.5 bg-[var(--color-surface-inactive)] backdrop-blur-2xl border border-[var(--color-surface-border)] rounded-[22px] flex items-end gap-3 shadow-[0_24px_50px_rgba(0,0,0,0.5)] ring-1 ring-black/5 transition-colors duration-250">

        <DockIcon id="about" icon={User} label="About Me" />
        <DockIcon id="projects" icon={FolderCode} label="Projects" />
        <DockIcon id="resume" icon={FileText} label="Curriculum Vitae" />
        <DockIcon id="notepad" icon={Notebook} label="Notes" />
        <DockIcon id="contact" icon={Mail} label="Contact" />

        {/* Vertical divider */}
        <div className="w-[1px] h-9 bg-[var(--color-surface-border)] rounded-full mx-1 align-middle self-center transition-colors duration-250" />

        <DockIcon id="terminal" icon={Terminal} label="Terminal" />

        {/* Dynamic Theme Toggle Action Button */}
        <div className="relative group flex flex-col items-center justify-center ml-1">
          <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all duration-150 delay-100 transform scale-95 group-hover:scale-100 bg-[var(--color-surface-dark)] backdrop-blur-md border border-[var(--color-surface-border)] text-white text-[11px] font-medium px-3 py-1.5 rounded-md pointer-events-none z-[99999] shadow-lg whitespace-nowrap">
            {isLight ? 'Dark Mode' : 'Light Mode'}
          </span>

          <motion.button
            whileHover={{ scale: 1.15, y: -6 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleThemeToggle}
            className="relative flex items-center justify-center w-[48px] h-[48px] transition-all duration-200 cursor-pointer"
          >
            {/* Themed squircle for the toggle button using the exact same dark 3D base! */}
            <div className="w-[44px] h-[44px] flex items-center justify-center rounded-[12px] bg-gradient-to-b from-[#3A3A3C] to-[#1C1C1E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_10px_rgba(0,0,0,0.25)] ring-1 ring-black/20 transition-colors duration-250">
              {isLight ? (
                <Moon size={22} strokeWidth={2} className="text-[#BF5AF2] drop-shadow-sm animate-in fade-in zoom-in-75 duration-200" />
              ) : (
                <Sun size={22} strokeWidth={2} className="text-amber-400 drop-shadow-sm animate-in fade-in zoom-in-75 duration-200" />
              )}
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
