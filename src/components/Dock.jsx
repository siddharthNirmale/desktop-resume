import { useState, useEffect, useRef } from 'react';
import { User, FolderCode, FileText, Mail, Terminal, Notebook, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

// Premium 3D Plastic Theme Styling
const getAppIconStyle = (isLight, isOrange = false) => {
  // Electric Orange for special actions (Theme Toggle)
  if (isOrange) {
    return {
      wrapper: `w-[52px] h-[52px] flex items-center justify-center rounded-[18px]
                bg-gradient-to-b from-[#ff6b1a] to-[#e64d00]
                border-t-[3px] border-t-[#ff9955] border-b-[5px] border-b-[#b33c00] border-x-[2px] border-x-[#e64d00]
                shadow-[inset_0_4px_6px_rgba(255,255,255,0.5),_0_10px_20px_rgba(255,85,0,0.3)]
                transition-all duration-300`,
      icon: 'text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]'
    };
  }

  // Vivid Electric Blue for standard apps
  return {
    wrapper: `w-[52px] h-[52px] flex items-center justify-center rounded-[18px]
              bg-gradient-to-b from-[#0066ff] to-[#0044cc]
              border-t-[3px] border-t-[#6699ff] border-b-[5px] border-b-[#002299] border-x-[2px] border-x-[#0055ff]
              shadow-[inset_0_4px_6px_rgba(255,255,255,0.4),_0_10px_20px_rgba(0,85,255,0.3)]
              transition-all duration-300`,
    icon: 'text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]'
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
        {/* Y2K Chunky Tooltip */}
        <span className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-all
                         bg-[#ff5500] text-white font-bold tracking-wide text-[12px] px-4 py-2
                         rounded-[12px] border-t-2 border-t-[#ff8833] border-b-4 border-b-[#cc4400]
                         pointer-events-none z-[99999] shadow-[0_8px_16px_rgba(255,85,0,0.3)] whitespace-nowrap">
          {label}
        </span>

        {/* Tactile Framer Motion Settings */}
        <motion.button
          whileHover={{ scale: 1.15, y: -8 }}
          whileTap={{ scale: 0.85, y: 4 }}
          onClick={handleClick}
          className="relative flex items-center justify-center w-[52px] h-[52px] cursor-pointer outline-none"
        >
          <div className={`${wrapper} group-hover:brightness-110`}>
            <Icon size={24} strokeWidth={2.5} className={`${iconColor}`} />
          </div>

          {/* Chunky Toy-like Notification Badge */}
          {badge > 0 && (
            <div className="absolute -top-2 -right-2 min-w-[20px] h-[20px] px-1.5
                            bg-[#ff2200] text-white text-[11px] font-black rounded-full
                            flex items-center justify-center border-2 border-white shadow-md z-10">
              {badge}
            </div>
          )}
        </motion.button>

        {/* Active Indicator Light */}
        {isOpen && (
          <div className="absolute -bottom-3 flex justify-center items-center h-2">
            <div className={`rounded-full transition-all
              ${isMinimized
                ? 'w-[6px] h-[6px] bg-gray-400 border border-gray-500'
                : 'w-[8px] h-[8px] bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] border border-white/50'}`}
            />
          </div>
        )}
      </div>
    );
  };

  // Neutral Background Tray with heavy 3D beveling
  const trayBase = isLight
    ? "bg-[#eef2f5] border-t-2 border-t-white border-b-[6px] border-b-[#cdd4db] border-x-2 border-x-[#e2e8f0]"
    : "bg-[#252830] border-t-2 border-t-[#424859] border-b-[6px] border-b-[#111317] border-x-2 border-x-[#2c3039]";

  const trayShadow = isLight
    ? "shadow-[inset_0_6px_10px_rgba(255,255,255,0.9),_0_24px_50px_rgba(0,10,30,0.15)]"
    : "shadow-[inset_0_6px_10px_rgba(255,255,255,0.05),_0_24px_50px_rgba(0,0,0,0.6)]";

  return (
    <div ref={dockRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[99999] pointer-events-auto">
      <div className={`px-4 py-3 rounded-[32px] flex items-end gap-3.5 transition-colors duration-300 ${trayBase} ${trayShadow}`}>

        <DockIcon id="about" icon={User} label="About Me" />
        <DockIcon id="projects" icon={FolderCode} label="Projects" />
        <DockIcon id="resume" icon={FileText} label="Resume" />
        <DockIcon id="notepad" icon={Notebook} label="Notes" />
        <DockIcon id="contact" icon={Mail} label="Contact" />

        {/* Recessed divider line */}
        <div className={`w-[3px] h-10 rounded-full mx-1 align-middle self-center transition-colors duration-300
                        ${isLight ? 'bg-[#cdd4db] shadow-[1px_1px_0_white]' : 'bg-[#111317] shadow-[1px_1px_0_#424859]'}`}
        />

        <DockIcon id="terminal" icon={Terminal} label="Terminal" />

        {/* Orange Theme Toggle Button */}
        <div className="relative group flex flex-col items-center justify-center ml-1">
          <motion.button
            whileHover={{ scale: 1.15, y: -8 }}
            whileTap={{ scale: 0.85, y: 4 }}
            onClick={handleThemeToggle}
            className="relative flex items-center justify-center w-[52px] h-[52px] cursor-pointer outline-none"
          >
            <div className={`${getAppIconStyle(isLight, true).wrapper} group-hover:brightness-110`}>
              {isLight ? (
                <Moon size={24} strokeWidth={2.5} className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]" />
              ) : (
                <Sun size={24} strokeWidth={2.5} className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]" />
              )}
            </div>
          </motion.button>
        </div>

      </div>
    </div>
  );
}
