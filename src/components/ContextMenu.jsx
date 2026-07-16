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
      // Swapped to surface-elevated and added your custom popover-shadow
      className="fixed z-[999999] w-48 bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] rounded-xl popover-shadow py-1.5 overflow-hidden transition-colors duration-250"
    >
      <div className="px-3 py-1.5 mb-1 border-b border-[var(--color-surface-border)] transition-colors duration-250">
        {/* Swapped neutral-500 to dynamic secondary text */}
        <span className="text-micro font-bold text-[var(--color-text-secondary)] uppercase tracking-super-wide font-primary transition-colors duration-250">
          Desktop Actions
        </span>
      </div>

      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={(e) => { e.stopPropagation(); openApp(item.id); }}
          // Hover uses surface-border to look like a native highlight
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-border)] transition-colors uppercase tracking-widest font-primary group"
        >
          {/* Icons use secondary color until hovered */}
          <item.icon size={14} strokeWidth={2} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors duration-200" />
          {item.label}
        </button>
      ))}

      <div className="h-px bg-[var(--color-surface-border)] my-1 mx-2 transition-colors duration-250" />

      <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-[var(--color-text-tertiary)] opacity-60 cursor-not-allowed uppercase tracking-widest font-primary transition-colors duration-250">
        <Settings size={14} strokeWidth={2} className="text-[var(--color-text-tertiary)]" />
        System Preferences
      </button>
    </motion.div>
  );
}
