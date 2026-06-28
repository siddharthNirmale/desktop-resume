import { useState, useEffect, useRef } from 'react';
import { User, FolderCode, FileText, Mail, Terminal, Notebook } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dock({ windows, toggleWindow, bringToFront }) {
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0, id: null });
  const dockRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setMenu(prev => ({ ...prev, show: false }));
      }
    };
    if (menu.show) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menu.show]);

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
        // If it's open and focused, minimize it. If open but not focused, bring it to front.
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
<<<<<<< HEAD
        {/* Hardware-style minimal tooltip using global theme */}
        <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-surface border border-surface-border text-white text-micro font-bold uppercase tracking-super-wide font-primary px-3 py-1.5 rounded-lg pointer-events-none z-50 shadow-xl">
=======
        {/* macOS Style Crisp Dynamic Tooltip */}
        <span className="absolute -top-11 opacity-0 group-hover:opacity-100 transition-all duration-150 delay-100 transform scale-95 group-hover:scale-100 bg-[#2A2A2A]/90 backdrop-blur-md border border-white/10 text-[#EAEAEA] text-[11px] font-normal px-2.5 py-1 rounded-md pointer-events-none z-[99999] shadow-lg whitespace-nowrap">
>>>>>>> sid
          {label}
        </span>

        <motion.button
          whileHover={{ scale: 1.12, y: -4 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleClick}
<<<<<<< HEAD
          onContextMenu={(e) => { e.preventDefault(); setMenu({ show: true, x: e.clientX, y: e.clientY - 150, id }); }}
          className={`relative flex items-center justify-center w-12 h-12 rounded-2xl border transition-colors ${
            isOpen 
              ? 'bg-surface text-white border-surface-border shadow-sm' 
              : 'bg-transparent text-neutral-500 border-transparent hover:bg-surface hover:text-white hover:border-surface-border'
          }`}
        >
          {/* Thicker strokes to match the new mechanical window icons */}
          <Icon size={20} strokeWidth={2.5} />
          
          {/* Notification Badge updated to global accent */}
          {badge > 0 && (
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-white text-micro font-bold rounded-full flex items-center justify-center border-2 border-surface-dark"> 
=======
          onContextMenu={(e) => { 
            e.preventDefault(); 
            setMenu({ show: true, x: e.clientX, y: e.clientY - 150, id }); 
          }}
          className={`relative flex items-center justify-center w-[48px] h-[48px] rounded-[11px] transition-all duration-200 ${
            isOpen && !isMinimized
              ? 'text-white bg-white/5 shadow-inner' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          {/* Flat, Clean Native App Icon Design */}
          <Icon size={23} strokeWidth={1.75} className="drop-shadow-md" />
          
          {/* iOS/macOS Notification Badge */}
          {badge > 0 && (
            <div className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 bg-[#FF3B30] text-white text-[10px] font-semibold rounded-full flex items-center justify-center border border-black/20 shadow-sm"> 
>>>>>>> sid
              {badge} 
            </div>
          )}
        </motion.button>
        
        {/* Active Indicators: Translucent macOS System Dots */}
        {isOpen && (
          <div className="absolute -bottom-1.5 flex justify-center items-center h-2">
            <div className={`rounded-full transition-all duration-300 ${
              isMinimized 
<<<<<<< HEAD
                ? 'w-1 h-1 bg-neutral-600' // Subtle grey dot if minimized
                : 'w-1.5 h-1.5 bg-accent shadow-[0_0_8px_var(--color-accent)]' // Glowing dot linked to your CSS variable
=======
                ? 'w-[4px] h-[4px] bg-white/30' // Dimmed dot if minimized
                : 'w-[4px] h-[4px] bg-white shadow-[0_0_6px_#fff]' // Vibrant glowing white dot if active
>>>>>>> sid
            }`} />
          </div>
        )}
      </div>
    );
  };

  return (
<<<<<<< HEAD
    <div ref={dockRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[99999]">
      {/* Replaced solid flat hex codes with surface-dark and surface-border */}
      <div className="px-3 py-3 bg-surface-dark border border-surface-border rounded-3xl flex items-center gap-2 shadow-2xl">
        <DockIcon id="about" icon={User} label="About" />
=======
    <div ref={dockRef} className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[99999] pointer-events-auto">
      {/* Container utilizing authentic translucent dark glass overlay & subtle reflections */}
      <div className="px-3.5 py-2.5 bg-[#1C1C1E]/60 backdrop-blur-xl border border-white/10 rounded-[20px] flex items-end gap-2.5 shadow-[0_24px_50px_rgba(0,0,0,0.6)] ring-1 ring-black/40">
        <DockIcon id="about" icon={User} label="About Me" />
>>>>>>> sid
        <DockIcon id="projects" icon={FolderCode} label="Projects"  />
        <DockIcon id="resume" icon={FileText} label="Curriculum Vitae" />
        <DockIcon id="notepad" icon={Notebook} label="Notes" />
        <DockIcon id="contact" icon={Mail} label="Contact"  />
        
<<<<<<< HEAD
        {/* Separator mapped to surface-border */}
        <div className="w-[2px] h-5 bg-surface-border rounded-full mx-1" />
=======
        {/* Glass vertical app partition divider */}
        <div className="w-[1px] h-9 bg-white/10 rounded-full mx-1 align-middle self-center" />
>>>>>>> sid
        
        <DockIcon id="terminal" icon={Terminal} label="Terminal" />
      </div>
    </div>
  );
}