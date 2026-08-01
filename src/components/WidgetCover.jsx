import { motion, useMotionValue } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GripHorizontal, X } from 'lucide-react';

export default function WidgetCover({
  id, title, zIndex, onClose, constraintsRef, children,
  defaultWidth = 350, // Widgets usually start smaller
  defaultHeight = 250
}) {
  const [spawnPos, setSpawnPos] = useState(null);

  const width = useMotionValue(defaultWidth);
  const height = useMotionValue(defaultHeight);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    // Tighter random offset for widget clustering
    const randomOffset = Math.floor(Math.random() * 20) - 10;
    const centerTop = (window.innerHeight / 2) - (defaultHeight / 2) + randomOffset;
    const centerLeft = (window.innerWidth / 2) - (defaultWidth / 2) + randomOffset;

    setSpawnPos({
      top: centerTop,
      left: centerLeft
    });

    x.set(centerLeft);
    y.set(centerTop);
  }, [defaultWidth, defaultHeight, x, y]);

  const handleResize = (event, info) => {
    // Smaller minimum bounds for widgets
    width.set(Math.max(200, width.get() + info.delta.x));
    height.set(Math.max(150, height.get() + info.delta.y));
  };

  if (!spawnPos) return null;

  return (
    <motion.div
      drag={true}
      dragMomentum={false}
      dragHandleClassName="widget-header-drag"
      dragConstraints={constraintsRef}
      style={{ zIndex, x, y, width, height }}
      // Added backdrop-blur for a glassmorphic widget feel and rounded-xl for softer edges
      className="absolute flex flex-col overflow-hidden bg-[var(--color-surface)]/85 backdrop-blur-md rounded-xl border border-[var(--color-window-border)] shadow-xl transition-shadow duration-200"
      initial={{ opacity: 0, scale: 0.8, y: spawnPos.top + 20, x: spawnPos.left }}
      animate={{ opacity: 1, scale: 1, y: spawnPos.top, x: spawnPos.left }}
      exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 25,
        mass: 1
      }}
    >
      {/* Thinner, cleaner header for widgets */}
      <div className="h-[28px] min-h-[28px] flex items-center justify-between select-none bg-transparent border-b border-[var(--color-surface-border)]/50 relative group">

        {/* Left Drag Area with Grip Icon */}
        <div className="widget-header-drag flex-1 h-full flex items-center pl-3 cursor-grab active:cursor-grabbing">
          <GripHorizontal size={14} className="text-[var(--color-text-tertiary)] mr-2" />
          <span className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider opacity-80">
            {title}
          </span>
        </div>

        {/* Right Side Control Panel - Just Close for Widgets */}
        <div className="flex items-center h-full z-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-[32px] h-[28px] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[#E81123] hover:text-white transition-colors duration-150 rounded-tr-xl focus:outline-none cursor-default opacity-0 group-hover:opacity-100 sm:opacity-100"
            title="Close Widget"
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Widget Body Workspace */}
      <div className="flex-1 overflow-auto custom-scrollbar relative">
        {children}
      </div>

      {/* Resize Handle - Slightly smaller/subtler for widgets */}
      <motion.div
        onPan={handleResize}
        className="absolute bottom-0 right-0 w-[12px] h-[12px] cursor-se-resize z-50 flex items-end justify-end p-[2px]"
      >
        <svg width="8" height="8" viewBox="0 0 10 10" className="text-[var(--color-text-tertiary)] fill-current transition-colors duration-250 opacity-50 hover:opacity-100">
          <line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10" y1="5" x2="5" y2="10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
