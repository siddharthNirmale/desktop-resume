import { useState, useEffect, useRef } from 'react';
import { User, FolderCode, FileText, Mail, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dock({ windows, toggleWindow, bringToFront }) {
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0, id: null });
  const dockRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) setMenu(prev => ({ ...prev, show: false }));
    };
    if (menu.show) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menu.show]);

  const DockIcon = ({ id, icon: Icon, label, badge }) => {
    const win = windows.find(w => w.id === id);
    // Ignore widgets in the dock mapping just in case they slipped in
    if (win && win.type === 'widget') return null; 

    const isOpen = win?.isOpen;
    const isMinimized = win?.isMinimized;

    const handleClick = () => {
      if (!isOpen || isMinimized) {
        toggleWindow(id, 'isOpen', true);
        toggleWindow(id, 'isMinimized', false);
        bringToFront(id);
      } else {
        toggleWindow(id, 'isMinimized', true);
      }
    };

    return (
      <div className="relative group flex flex-col items-center justify-center">
        {/* Hardware-style minimal tooltip */}
        <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1a1a1a] border border-neutral-800 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg pointer-events-none z-50 shadow-xl">
          {label}
        </span>

        <motion.button
          // Tighter, less bouncy animations for a "clicky" hardware feel
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          onContextMenu={(e) => { e.preventDefault(); setMenu({ show: true, x: e.clientX, y: e.clientY - 150, id }); }}
          className={`relative flex items-center justify-center w-12 h-12 rounded-2xl border transition-colors ${
            isOpen 
              ? 'bg-[#1a1a1a] text-white border-neutral-700 shadow-sm' 
              : 'bg-transparent text-neutral-500 border-transparent hover:bg-[#1a1a1a] hover:text-white hover:border-neutral-800'
          }`}
        >
          {/* Thicker strokes to match the new mechanical window icons */}
          <Icon size={20} strokeWidth={2.5} />
          
          {/* Notification Badge updated to signature red */}
          {badge > 0 && (
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E51919] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-[#0F0F0F]"> 
              {badge} 
            </div>
          )}
        </motion.button>
        
        {/* Active Indicators: Replaced pills with the signature system dots */}
        {isOpen && (
          <div className="absolute -bottom-3 flex justify-center">
            <div className={`rounded-full transition-all ${
              isMinimized 
                ? 'w-1 h-1 bg-neutral-600' // Subtle grey dot if minimized
                : 'w-1.5 h-1.5 bg-[#E51919] shadow-[0_0_8px_rgba(229,25,25,0.4)]' // Glowing red dot if active/open
            }`} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={dockRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[99999]">
      {/* Replaced backdrop-blur with solid flat #0F0F0F and a sharper border/shadow */}
      <div className="px-3 py-3 bg-[#0F0F0F] border border-neutral-800 rounded-3xl flex items-center gap-2 shadow-2xl">
        <DockIcon id="about" icon={User} label="About" />
        <DockIcon id="projects" icon={FolderCode} label="Projects"  />
        <DockIcon id="notepad" icon={FileText} label="Notes" />
        <DockIcon id="contact" icon={Mail} label="Contact"  />
        
        {/* Separator changed from a thin line to a thicker dot-like pill */}
        <div className="w-[2px] h-5 bg-neutral-800 rounded-full mx-1" />
        
        <DockIcon id="terminal" icon={Terminal} label="Terminal" />
      </div>
    </div>
  );
}