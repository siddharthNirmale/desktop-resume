import { useState, useEffect, useRef } from 'react';
import { User, FolderCode, FileText, Mail, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dock({ windows, toggleWindow, bringToFront }) {
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0, id: null });
  const dockRef = useRef(null);

  // Close right-click menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setMenu(prev => ({ ...prev, show: false }));
      }
    };
    if (menu.show) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menu.show]);

  const handleRightClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    // Safely position the menu above the dock
    setMenu({
      show: true,
      x: e.clientX,
      y: e.clientY - 150, 
      id
    });
  };

  const executeMenuAction = (action) => {
    const { id } = menu;
    if (action === 'open') {
      toggleWindow(id, 'isOpen', true);
      toggleWindow(id, 'isMinimized', false);
      bringToFront(id);
    } else if (action === 'minimize') {
      toggleWindow(id, 'isMinimized', true);
    } else if (action === 'close') {
      toggleWindow(id, 'isOpen', false);
    }
    setMenu({ ...menu, show: false });
  };

  // Reusable & Stabilized Dock Icon Component
  const DockIcon = ({ id, icon: Icon, label, badge }) => {
    const win = windows.find(w => w.id === id);
    const isOpen = win?.isOpen;
    const isMinimized = win?.isMinimized;

    // Fixed Logic: Single click handles everything seamlessly
    const handleClick = () => {
      if (!isOpen) {
        // Open it if it's closed
        toggleWindow(id, 'isOpen', true);
        toggleWindow(id, 'isMinimized', false);
        bringToFront(id);
      } else if (isMinimized) {
        // Restore it if it's minimized
        toggleWindow(id, 'isMinimized', false);
        bringToFront(id);
      } else {
        // Minimize it if it's currently visible
        toggleWindow(id, 'isMinimized', true);
      }
    };

    return (
      <div className="relative group flex flex-col items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.15, y: -4 }} // Smooth, stable lift effect
          whileTap={{ scale: 0.95 }} // Satisfying click feedback
          onClick={handleClick}
          onContextMenu={(e) => handleRightClick(e, id)}
          className={`relative flex items-center justify-center w-12 h-12 rounded-xl border transition-colors duration-200 outline-none ${
            isOpen
              ? 'bg-neutral-800 text-white border-neutral-600 shadow-[0_10px_20px_rgba(0,0,0,0.5)]'
              : 'bg-[#111111]/80 text-neutral-400 border-neutral-800/50 hover:bg-neutral-800 hover:text-white hover:border-neutral-700'
          } ${isMinimized ? 'opacity-50 hover:opacity-100' : ''}`}
        >
          <Icon size={22} strokeWidth={1.5} />

          {/* Premium UI: Notification Badge */}
          {badge > 0 && (
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#ed6a5e] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#050505] shadow-sm z-10">
              {badge}
            </div>
          )}
        </motion.button>

        {/* Floating Tooltip (Hidden when context menu is active) */}
        {!menu.show && (
          <div className="absolute -top-12 bg-[#0a0a0a] text-neutral-300 text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap border border-neutral-800 shadow-xl pointer-events-none transform translate-y-2 group-hover:translate-y-0">
            {label}
          </div>
        )}

        {/* Breathing Active State Indicator */}
        {isOpen && (
          <div className={`absolute -bottom-2.5 h-[3px] rounded-full transition-all duration-300 ${
            isMinimized ? 'w-1.5 bg-neutral-600' : 'w-5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]'
          }`} />
        )}
      </div>
    );
  };

  return (
    // Wrap everything in a container to manage absolute positioning safely
    <div ref={dockRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[99999]">
      
      {/* Context Menu */}
      <AnimatePresence>
        {menu.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.1 }}
            style={{ position: 'fixed', top: menu.y, left: menu.x }}
            className="w-40 bg-[#1a1a1a]/95 backdrop-blur-xl border border-neutral-800 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] p-1 text-sm text-gray-200 z-[999999]"
          >
            <div className="flex flex-col">
              <button onClick={() => executeMenuAction('open')} className="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-800 hover:text-white transition-colors">Open</button>
              <button onClick={() => executeMenuAction('minimize')} className="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-800 hover:text-white transition-colors">Minimize</button>
              <div className="h-[1px] bg-neutral-800 my-1 mx-2" />
              <button onClick={() => executeMenuAction('close')} className="w-full text-left px-3 py-2 rounded-md hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors">Close App</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Sleek Dock Container */}
      <div className="px-3 py-2.5 bg-[#050505]/80 backdrop-blur-xl border border-neutral-800/80 rounded-2xl flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <DockIcon id="about" icon={User} label="About" />
        <DockIcon id="projects" icon={FolderCode} label="Projects" badge={2} />
        <DockIcon id="notepad" icon={FileText} label="Notes" />
        <DockIcon id="contact" icon={Mail} label="Contact" badge={1} />
        
        <div className="w-[1px] h-8 bg-neutral-800 mx-1" /> {/* Divider */}
        
        <DockIcon id="terminal" icon={Terminal} label="Terminal" />
      </div>
    </div>
  );
}