import { motion } from 'framer-motion';
import {
  TerminalIcon as Terminal,
  FileTextIcon as FileText,
  FolderCodeIcon as FolderCode,
} from "lucide-animated";
import { FiEye, FiRotateCcw, FiSliders } from "react-icons/fi";

export default function ContextMenu({
  x,
  y,
  onClose,
  toggleWindow,
  bringToFront,
  onOpenControlCenter,
  minimizeAll,
  restoreAll,
  resetLayout,
  allWindowsMinimized = false,
}) {
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
  const posY = typeof window !== "undefined" ? Math.min(y, window.innerHeight - 240) : y;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      style={{ top: posY, left: posX }}
      onContextMenu={(e) => e.preventDefault()}
      className="
        fixed z-[999999] w-60 py-1.5
        bg-[var(--color-surface-elevated)]/90 backdrop-blur-2xl
        border border-[var(--color-surface-border)] rounded-xl
        shadow-[0_16px_36px_rgba(0,0,0,0.35)] overflow-hidden font-primary
      "
    >
      {/* Header */}
      <div className="px-3 py-1.5 mb-1">
        <span className="text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-[0.06em]">
          Desktop Actions
        </span>
      </div>

      {/* Menu Items */}
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
            <item.icon
              size={14}
              strokeWidth={2}
              className="text-[var(--color-text-secondary)] group-hover:text-white transition-colors"
            />
            {item.label}
          </button>
        ))}

        <div className="h-[1px] w-full my-1 bg-[var(--color-surface-border)] opacity-60" />

        {/* Control Center */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenControlCenter?.();
            onClose();
          }}
          className="
            w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px]
            text-[13px] font-medium text-[var(--color-text)]
            hover:bg-[var(--color-accent)] hover:text-white
            transition-colors cursor-default group focus:outline-none
          "
        >
          <FiSliders size={14} className="text-[var(--color-text-secondary)] group-hover:text-white transition-colors" />
          Control Center & Widgets
        </button>

        {/* Show Desktop */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (allWindowsMinimized) {
              restoreAll?.();
            } else {
              minimizeAll?.();
            }
            onClose();
          }}
          className="
            w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px]
            text-[13px] font-medium text-[var(--color-text)]
            hover:bg-[var(--color-accent)] hover:text-white
            transition-colors cursor-default group focus:outline-none
          "
        >
          <FiEye size={14} className="text-[var(--color-text-secondary)] group-hover:text-white transition-colors" />
          {allWindowsMinimized ? "Show Windows" : "Show Desktop"}
        </button>

        {/* Reset Layout */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            resetLayout?.();
            onClose();
          }}
          className="
            w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px]
            text-[13px] font-medium text-[var(--color-text-secondary)]
            hover:bg-[var(--color-surface-inactive)] hover:text-[var(--color-text)]
            transition-colors cursor-default group focus:outline-none
          "
        >
          <FiRotateCcw size={13} className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text)] transition-colors" />
          Reset Workspace Layout
        </button>
      </div>
    </motion.div>
  );
}

