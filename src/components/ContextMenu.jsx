import { motion } from 'framer-motion';
import { Terminal, FileText, FolderCode, Settings } from 'lucide-react';

export default function ContextMenu({ x, y, onClose, toggleWindow, bringToFront }) {
  
  // Helper to open an app from the menu
  const openApp = (id) => {
    toggleWindow(id, 'isOpen', true);
    toggleWindow(id, 'isMinimized', false);
    bringToFront(id);
    onClose(); // Close the menu after clicking
  };

  // Menu items array for clean mapping
  const menuItems = [
    { id: 'terminal', label: 'Open Terminal', icon: Terminal },
    { id: 'notepad', label: 'New Note', icon: FileText },
    { id: 'projects', label: 'View Projects', icon: FolderCode },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1 }}
      style={{ top: y, left: x }}
      // Prevent the browser menu from showing up if you right-click ON this menu
      onContextMenu={(e) => e.preventDefault()} 
      className="fixed z-[999999] w-48 bg-[#1a1a1a] border border-neutral-800 rounded-xl shadow-2xl py-1.5 overflow-hidden"
    >
      {/* Small Header */}
      <div className="px-3 py-1.5 mb-1 border-b border-neutral-800/50">
        <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest">
          Desktop Actions
        </span>
      </div>

      {/* Map through the apps */}
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={(e) => {
            e.stopPropagation(); // Prevent the desktop onClick from firing immediately
            openApp(item.id);
          }}
          className="w-full flex items-center gap-3 px-3 py-2 text-[10px] font-bold text-neutral-400 hover:text-[#E51919] hover:bg-[#0F0F0F] transition-colors uppercase tracking-[0.1em] group"
        >
          <item.icon size={14} strokeWidth={2} className="text-neutral-500 group-hover:text-[#E51919] transition-colors" />
          {item.label}
        </button>
      ))}

     

      {/* Decorative disabled setting */}
     
    </motion.div>
  );
}