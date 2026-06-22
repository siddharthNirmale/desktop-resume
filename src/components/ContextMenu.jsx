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
      // Mapped to surface and surface-border
      className="fixed z-[999999] w-48 bg-surface border border-surface-border rounded-xl shadow-2xl py-1.5 overflow-hidden"
    >
      <div className="px-3 py-1.5 mb-1 border-b border-surface-border/50">
        {/* Unified with your global micro-typography system */}
        <span className="text-micro font-bold text-neutral-500 uppercase tracking-super-wide font-primary">
          Desktop Actions
        </span>
      </div>
      
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={(e) => { e.stopPropagation(); openApp(item.id); }}
          // Swapped hovers to text-accent and bg-surface-dark, standardized to text-xs
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-neutral-400 hover:text-accent hover:bg-surface-dark transition-colors uppercase tracking-widest font-primary group"
        >
          {/* Icon hover mapped to text-accent */}
          <item.icon size={14} strokeWidth={2} className="text-neutral-500 group-hover:text-accent transition-colors" />
          {item.label}
        </button>
      ))}
      
      {/* Separator mapped to surface-border */}
      <div className="h-px bg-surface-border/50 my-1 mx-2" />
      
      <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-neutral-600 cursor-not-allowed uppercase tracking-widest font-primary">
        <Settings size={14} strokeWidth={2} />
        System Preferences
      </button>
    </motion.div>
  );
}