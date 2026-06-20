import { motion } from 'framer-motion';
import { Terminal, FileText, FolderCode, Settings } from 'lucide-react';

export default function ContextMenu({ x, y, onClose, toggleWindow, bringToFront }) {
  const openApp = (id) => {
    toggleWindow(id, 'isOpen', true);
    toggleWindow(id, 'isMinimized', false);
    bringToFront(id);
    onClose();
  };

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
      onContextMenu={(e) => e.preventDefault()} 
      className="fixed z-[999999] w-48 bg-[#1a1a1a] border border-neutral-800 rounded-xl shadow-2xl py-1.5 overflow-hidden"
    >
      <div className="px-3 py-1.5 mb-1 border-b border-neutral-800/50">
        <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest">Desktop Actions</span>
      </div>
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={(e) => { e.stopPropagation(); openApp(item.id); }}
          className="w-full flex items-center gap-3 px-3 py-2 text-[10px] font-bold text-neutral-400 hover:text-[#E51919] hover:bg-[#0F0F0F] transition-colors uppercase tracking-[0.1em] group"
        >
          <item.icon size={14} strokeWidth={2} className="text-neutral-500 group-hover:text-[#E51919] transition-colors" />
          {item.label}
        </button>
      ))}
      <div className="h-px bg-neutral-800/50 my-1 mx-2" />
      <button className="w-full flex items-center gap-3 px-3 py-2 text-[10px] font-bold text-neutral-600 cursor-not-allowed uppercase tracking-[0.1em]">
        <Settings size={14} strokeWidth={2} />
        System Preferences
      </button>
    </motion.div>
  );
}