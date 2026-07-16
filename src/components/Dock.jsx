import { useState, useEffect, useRef } from 'react';
import { User, FolderCode, FileText, Mail, Terminal, Notebook, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dock({ windows, toggleWindow, bringToFront }) {
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0, id: null });
  const [isLight, setIsLight] = useState(false);
  const dockRef = useRef(null);

  // Checks user storage or OS preference on mount
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

  // 🌊 New Wave Animation Toggle Handler 🌊
  const handleThemeToggle = (e) => {
    const willBeLight = !isLight;

    // 1. The core logic we want to run
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

    // 2. Fallback for older browsers that don't support View Transitions
    if (!document.startViewTransition) {
      toggle();
      return;
    }

    // 3. Get the exact mouse click coordinates
    const x = e.clientX;
    const y = e.clientY;

    // 4. Calculate how big the circle needs to be to cover the whole screen
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    // 5. Tell the browser to take a snapshot, run the toggle, and prepare for animation
    const transition = document.startViewTransition(toggle);

    // 6. Animate the new theme in using a growing circular clip-path
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600, // How fast the wave travels
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
        <span className="absolute -top-11 opacity-0 group-hover:opacity-100 transition-all duration-150 delay-100 transform scale-95 group-hover:scale-100 bg-[#2A2A2A]/90 backdrop-blur-md border border-white/10 text-[#EAEAEA] text-[11px] font-normal px-2.5 py-1 rounded-md pointer-events-none z-[99999] shadow-lg whitespace-nowrap unique-dock-tooltip">
          {label}
        </span>

        <motion.button
          whileHover={{ scale: 1.12, y: -4 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleClick}
          onContextMenu={(e) => {
            e.preventDefault();
            setMenu({ show: true, x: e.clientX, y: e.clientY - 150, id });
          }}
          className={`relative flex items-center justify-center w-[48px] h-[48px] rounded-[11px] transition-all duration-200 cursor-pointer ${isOpen && !isMinimized
              ? 'text-white bg-white/5 shadow-inner border border-white/5'
              : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
        >
          <Icon size={23} strokeWidth={1.75} className="drop-shadow-md transition-colors duration-200 label-icon" />

          {badge > 0 && (
            <div className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 bg-[#FF3B30] text-white text-[10px] font-semibold rounded-full flex items-center justify-center border border-black/20 shadow-sm">
              {badge}
            </div>
          )}
        </motion.button>

        {/* Active Indicators: Translucent macOS System Dots */}
        {isOpen && (
          <div className="absolute -bottom-1.5 flex justify-center items-center h-2">
            <div className={`rounded-full transition-all duration-300 ${isMinimized
                ? 'w-[4px] h-[4px] bg-white/30'
                : 'w-[4px] h-[4px] bg-white shadow-[0_0_6px_#fff]'
              }`} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={dockRef} className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[99999] pointer-events-auto custom-dock-container">
      {/* Container utilizing authentic translucent dark glass overlay & subtle reflections */}
      <div className="px-3.5 py-2.5 bg-[#1C1C1E]/60 backdrop-blur-xl border border-white/10 rounded-[20px] flex items-end gap-2.5 shadow-[0_24px_50px_rgba(0,0,0,0.6)] ring-1 ring-black/40">
        <DockIcon id="about" icon={User} label="About Me" />
        <DockIcon id="projects" icon={FolderCode} label="Projects" />
        <DockIcon id="resume" icon={FileText} label="Curriculum Vitae" />
        <DockIcon id="notepad" icon={Notebook} label="Notes" />
        <DockIcon id="contact" icon={Mail} label="Contact" />

        {/* Glass vertical app partition divider */}
        <div className="w-[1px] h-9 bg-white/10 rounded-full mx-1 align-middle self-center" />

        <DockIcon id="terminal" icon={Terminal} label="Terminal" />

        {/* Dynamic Theme Toggle Action Button */}
        <div className="relative group flex flex-col items-center justify-center">
          <span className="absolute -top-11 opacity-0 group-hover:opacity-100 transition-all duration-150 delay-100 transform scale-95 group-hover:scale-100 bg-[#2A2A2A]/90 backdrop-blur-md border border-white/10 text-[#EAEAEA] text-[11px] font-normal px-2.5 py-1 rounded-md pointer-events-none z-[99999] shadow-lg whitespace-nowrap unique-dock-tooltip">
            {isLight ? 'Dark Mode' : 'Light Mode'}
          </span>

          <motion.button
            whileHover={{ scale: 1.12, y: -4 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleThemeToggle}
            className="relative flex items-center justify-center w-[48px] h-[48px] rounded-[11px] transition-all duration-200 text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            {isLight ? (
              <Moon size={23} strokeWidth={1.75} className="drop-shadow-md text-[var(--color-accent)] animate-in fade-in zoom-in-75 duration-200" />
            ) : (
              <Sun size={23} strokeWidth={1.75} className="drop-shadow-md text-amber-400 animate-in fade-in zoom-in-75 duration-200" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
