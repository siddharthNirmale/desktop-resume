import { motion, useMotionValue } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Minus, Square, Copy, X } from 'lucide-react';

export default function Window({
  id, title, isMinimized, zIndex, onClose, onMinimize, onFocus, constraintsRef, children,
  defaultWidth = 750,
  defaultHeight = 550
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [spawnPos, setSpawnPos] = useState(null);

  const width = useMotionValue(defaultWidth);
  const height = useMotionValue(defaultHeight);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const randomOffset = Math.floor(Math.random() * 30) - 15;
    const centerTop = (window.innerHeight / 2) - (defaultHeight / 2) + randomOffset;
    const centerLeft = (window.innerWidth / 2) - (defaultWidth / 2) + randomOffset;

    setSpawnPos({
      top: centerTop,
      left: centerLeft
    });

    // Set initial position to center
    x.set(centerLeft);
    y.set(centerTop);
  }, [defaultWidth, defaultHeight]);

  const toggleMaximize = () => {
    if (!isFocused) {
      width.set(window.innerWidth * 0.9);
      height.set(window.innerHeight * 0.85);
      x.set(window.innerWidth * 0.05 - spawnPos.left);
      y.set(window.innerHeight * 0.06 - spawnPos.top);
    } else {
      width.set(defaultWidth);
      height.set(defaultHeight);
      x.set(0);
      y.set(0);
    }
    setIsFocused(!isFocused);
  };

  const handleResize = (event, info) => {
    if (!isFocused) {
      width.set(Math.max(400, width.get() + info.delta.x));
      height.set(Math.max(350, height.get() + info.delta.y));
    }
  };

  if (!spawnPos) return null;

  return (
    <motion.div
      drag={true}
      dragMomentum={false}
      dragHandleClassName="window-header-drag"
      dragConstraints={constraintsRef}
      onMouseDown={onFocus}
      style={{ zIndex, x, y, width, height }}
      className={`absolute flex flex-col overflow-hidden bg-[var(--color-surface)] rounded-[8px] border border-[var(--color-window-border)] window-shadow transition-shadow duration-200 ${isMinimized ? 'hidden' : ''}`}
      initial={{ opacity: 0, scale: 0.5, x: spawnPos.left, y: spawnPos.top }}
      animate={{ opacity: 1, scale: 1, x: spawnPos.left, y: spawnPos.top }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 1
      }}
    >
      {/* Top Header Shell - Now adapts to light/dark automatically */}
      <div className="h-[36px] min-h-[36px] flex items-center justify-between select-none bg-[var(--color-surface-inactive)] border-b border-[var(--color-surface-border)] relative transition-colors duration-250">

        {/* Left Drag Area */}
        <div
          className="window-header-drag flex-1 h-full flex items-center pl-4 cursor-default"
          onDoubleClick={toggleMaximize}
        >
          <div className="pointer-events-none">
            <span className="text-[12px] font-medium text-[var(--color-text)] tracking-wide opacity-90 transition-colors duration-250">
              {title}
            </span>
          </div>
        </div>

        {/* Right Side Control Panel */}
        <div className="flex items-center h-full z-50 relative">
          {/* Minimize Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="w-[42px] h-[36px] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-border)] hover:text-[var(--color-text)] transition-colors duration-150 focus:outline-none cursor-default"
            title="Minimize"
          >
            <Minus size={13} strokeWidth={2.5} />
          </button>

          {/* Maximize / Restore Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize();
            }}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-[42px] h-[36px] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-border)] hover:text-[var(--color-text)] transition-colors duration-150 focus:outline-none cursor-default"
            title={isFocused ? "Restore Down" : "Maximize"}
          >
            {isFocused ? (
              <Copy size={11} strokeWidth={2.5} className="-scale-y-100 transform" />
            ) : (
              <Square size={11} strokeWidth={2.5} />
            )}
          </button>

          {/* Close Icon - Keeps the red hover effect in both modes */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-[42px] h-[36px] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[#E81123] hover:text-white transition-colors duration-150 rounded-tr-[7px] focus:outline-none cursor-default"
            title="Close"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Window Body Workspace */}
      <div className="flex-1 overflow-auto custom-scrollbar bg-[var(--color-surface)] relative transition-colors duration-250">
        {children}
      </div>

      {/* Resize Handle - Mapped to tertiary text color for subtlety */}
      {!isFocused && (
        <motion.div
          onPan={handleResize}
          className="absolute bottom-0 right-0 w-[14px] h-[14px] cursor-se-resize z-50 flex items-end justify-end p-[2px]"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" className="text-[var(--color-text-tertiary)] fill-current transition-colors duration-250">
            <line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1.2" />
            <line x1="10" y1="4" x2="4" y2="10" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}
