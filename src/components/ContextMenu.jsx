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
      transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ top: posY, left: posX }}
      onContextMenu={(e) => e.preventDefault()}
      className="
        fixed z-[999999] w-[210px] py-1
        bg-[var(--color-surface-elevated)]/85 backdrop-blur-2xl
        border border-[var(--color-surface-border)] rounded-xl
        shadow-[var(--shadow-popover)] overflow-hidden font-primary select-none
      "
    >
      {/* Header */}
      <div className="px-2.5 py-1 mb-0.5">
        <span className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.06em]">
          Desktop Actions
        </span>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col px-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={(e) => { e.stopPropagation(); openApp(item.id); }}
            className="
              w-full flex items-center gap-2 px-2 py-1.5 rounded-md
              text-[12px] font-medium text-[var(--color-text)]
              hover:bg-[var(--color-accent)] hover:text-white
              transition-colors cursor-default group focus:outline-none
            "
          >
            <item.icon
              size={13}
              strokeWidth={2}
              className="text-[var(--color-text-secondary)] group-hover:text-white transition-colors shrink-0"
            />
            <span>{item.label}</span>
          </button>
        ))}

        <div className="h-[1px] w-full my-1 bg-[var(--color-surface-border)]" />

        {/* Control Center */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenControlCenter?.();
            onClose();
          }}
          className="
            w-full flex items-center gap-2 px-2 py-1.5 rounded-md
            text-[12px] font-medium text-[var(--color-text)]
            hover:bg-[var(--color-accent)] hover:text-white
            transition-colors cursor-default group focus:outline-none
          "
        >
          <FiSliders size={13} className="text-[var(--color-text-secondary)] group-hover:text-white transition-colors shrink-0" />
          <span>Control Center & Widgets</span>
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
            w-full flex items-center gap-2 px-2 py-1.5 rounded-md
            text-[12px] font-medium text-[var(--color-text)]
            hover:bg-[var(--color-accent)] hover:text-white
            transition-colors cursor-default group focus:outline-none
          "
        >
          <FiEye size={13} className="text-[var(--color-text-secondary)] group-hover:text-white transition-colors shrink-0" />
          <span>{allWindowsMinimized ? "Show Windows" : "Show Desktop"}</span>
        </button>

        {/* Reset Layout */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            resetLayout?.();
            onClose();
          }}
          className="
            w-full flex items-center gap-2 px-2 py-1.5 rounded-md
            text-[12px] font-medium text-[var(--color-text-secondary)]
            hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]
            transition-colors cursor-default group focus:outline-none
          "
        >
          <FiRotateCcw size={13} className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text)] transition-colors shrink-0" />
          <span>Reset Layout</span>
        </button>
      </div>

    </motion.div>
  );
}

