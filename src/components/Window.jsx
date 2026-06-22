import { motion, useMotionValue } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Minus, X, Expand, Shrink } from 'lucide-react';

export default function Window({ 
  id, title, isMinimized, zIndex, onClose, onMinimize, onFocus, constraintsRef, children,
  defaultWidth = 550, 
  defaultHeight = 400 
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [spawnPos, setSpawnPos] = useState(null);
  
  const width = useMotionValue(defaultWidth);
  const height = useMotionValue(defaultHeight);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const randomOffset = Math.floor(Math.random() * 40) - 20;
    setSpawnPos({ top: (window.innerHeight / 2) - (defaultHeight / 2) + randomOffset, left: (window.innerWidth / 2) - (defaultWidth / 2) + randomOffset });
  }, [defaultWidth, defaultHeight]);

  const toggleFocus = () => {
    if (!isFocused) {
      width.set(window.innerWidth * 0.7);
      height.set(window.innerHeight * 0.7);
    } else {
      width.set(defaultWidth);
      height.set(defaultHeight);
    }
    setIsFocused(!isFocused);
  };

  const handleResize = (event, info) => {
    if (!isFocused) {
      width.set(Math.max(350, width.get() + info.delta.x));
      height.set(Math.max(300, height.get() + info.delta.y));
    }
  };

  if (!spawnPos) return null;

  return (
    <motion.div
      drag={true}
      dragMomentum={false}
      dragHandleClassName="window-header"
      dragConstraints={constraintsRef}
      onMouseDown={onFocus}
      style={{ zIndex, x, y, width, height }}
      className={`absolute bg-surface border border-surface-border rounded-xl shadow-xl flex flex-col overflow-hidden ${isMinimized ? 'hidden' : ''}`}
      initial={{ top: spawnPos.top, left: spawnPos.left, opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="window-header h-10 px-4 flex items-center justify-between border-b border-surface-border bg-surface  select-none cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2">
          {/* Swapped hardcoded red for your global accent color */}
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          {/* Swapped hardcoded px/em values for standard Tailwind text-xs and tracking-widest, added a custom font class */}
          <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em]  ">{title}</span>
        </div>
        <div className="flex items-center gap-3 text-neutral-500">
          <button onClick={onMinimize} className="hover:text-white transition-colors">
            <Minus size={14} strokeWidth={2} />
          </button>
          <button onClick={toggleFocus} className="hover:text-white transition-colors">
            {isFocused ? <Shrink size={14} strokeWidth={2} /> : <Expand size={14} strokeWidth={2} />}
          </button>
          {/* Swapped hardcoded red hover for your global accent color */}
          <button onClick={onClose} className="hover:text-accent transition-colors">
            <X size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto custom-scrollbar bg-surface">
        {children}
      </div>
      {!isFocused && (
        <motion.div
          onPan={handleResize}
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-end justify-end p-2 z-50 text-neutral-600 hover:text-accent transition-colors"
        >
          <div className="w-2 h-2 border-r-[1.5px] border-b-[1.5px] border-current"></div>
        </motion.div>
      )}
    </motion.div>
  );
}