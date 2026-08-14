import { motion } from 'framer-motion';
import { TerminalIcon as Terminal, FileTextIcon as FileText, FolderCodeIcon as FolderCode, SettingsIcon as Settings } from "lucide-animated";;

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

  const posX = typeof window !== "undefined" ? Math.min(x, window.innerWidth - 230) : x;
  const posY = typeof window !== "undefined" ? Math.min(y, window.innerHeight - 180) : y;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      style={{ top: posY, left: posX }}
      onContextMenu={(e) => e.preventDefault()}
      className="
        fixed z-[999999] w-56 py-1.5
        bg-[var(--color-surface-elevated)]/85 backdrop-blur-2xl
        border border-[var(--color-surface-border)] rounded-xl
        popover-shadow overflow-hidden font-primary
      "
    >
      {/* Header (Kept uppercase but softened) */}
      <div className="px-3 py-1.5 mb-1">
        <span className="text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-[0.06em]">
          Desktop Actions
        </span>
      </div>

      {/* Menu Items Wrapper (Allows for inner padding so hover states have border-radius) */}
      <div className="flex flex-col px-1.5">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={(e) => { e.stopPropagation(); openApp(item.id); }}
            className="
              w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px]
              text-[13px] font-medium text-[var(--color-text)]
              hover:bg-[var(--color-accent)] hover:text-white
              transition-colors cursor-default group focus:outline-none
            "
          >
            {/* Icons flip to white to match the accent background on hover (macOS style) */}
            <item.icon
              size={14}
              strokeWidth={2}
              className="text-[var(--color-text-secondary)] group-hover:text-white transition-colors"
            />
            {item.label}
          </button>
        ))}

        <div className="surface-divider h-[1px] w-full my-1 opacity-60" />

        <button className="
          w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px]
          text-[13px] font-medium text-[var(--color-text-tertiary)]
          opacity-60 cursor-not-allowed focus:outline-none
        ">
          <Settings size={14} strokeWidth={2} className="text-[var(--color-text-tertiary)]" />
          System Preferences
        </button>
      </div>
    </motion.div>
  );
}
