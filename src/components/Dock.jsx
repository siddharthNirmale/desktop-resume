import { useState, useEffect, useRef } from 'react';
import { User, FolderCode, FileText, Mail, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <motion.button
          whileHover={{ scale: 1.15, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          onContextMenu={(e) => { e.preventDefault(); setMenu({ show: true, x: e.clientX, y: e.clientY - 150, id }); }}
          className={`relative flex items-center justify-center w-12 h-12 rounded-xl border transition-colors ${isOpen ? 'bg-neutral-800 text-white border-neutral-600' : 'bg-[#111111] text-neutral-400 border-neutral-800'}`}
        >
          <Icon size={22} strokeWidth={1.5} />
          {badge > 0 && <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#ed6a5e] text-white text-[10px] font-bold rounded-full flex items-center justify-center"> {badge} </div>}
        </motion.button>
        {isOpen && <div className={`absolute -bottom-2.5 h-[3px] rounded-full transition-all ${isMinimized ? 'w-1.5 bg-neutral-600' : 'w-5 bg-white'}`} />}
      </div>
    );
  };

  return (
    <div ref={dockRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[99999]">
      <div className="px-3 py-2.5 bg-[#050505]/80 backdrop-blur-xl border border-neutral-800 rounded-2xl flex items-center gap-3 shadow-2xl">
        <DockIcon id="about" icon={User} label="About" />
        <DockIcon id="projects" icon={FolderCode} label="Projects" badge={2} />
        <DockIcon id="notepad" icon={FileText} label="Notes" />
        <DockIcon id="contact" icon={Mail} label="Contact" badge={1} />
        <div className="w-[1px] h-8 bg-neutral-800" />
        <DockIcon id="terminal" icon={Terminal} label="Terminal" />
      </div>
    </div>
  );
}