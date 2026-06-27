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

  useEffect(() => {
    // Spawn windows slightly offset from center
    const randomOffset = Math.floor(Math.random() * 40) - 20;
    setSpawnPos({ 
      top: (window.innerHeight / 2) - (defaultHeight / 2) + randomOffset, 
      left: (window.innerWidth / 2) - (defaultWidth / 2) + randomOffset 
    });
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
      width.set(Math.max(400, width.get() + info.delta.x));
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
      style={{ zIndex, width, height }}
      // Applied glass-panel and our custom border radius
      className={`absolute glass-panel !rounded-3xl flex flex-col shadow-2xl overflow-hidden ${isMinimized ? 'hidden' : ''}`}
      initial={{ top: spawnPos.top, left: spawnPos.left, opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* WINDOW HEADER */}
      <div className="window-header h-10 px-4 flex items-center justify-between border-b border-surface-border bg-surface-dark/50 select-none cursor-grab active:cursor-grabbing backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
            {title}
          </span>
        </div>
        
        {/* WINDOW CONTROLS */}
        <div className="flex items-center gap-2 text-text-tertiary">
          <button onClick={onMinimize} className="p-1 rounded-md hover:bg-surface-elevated hover:text-white transition-all">
            <Minus size={12} strokeWidth={2.5} />
          </button>
          <button onClick={toggleFocus} className="p-1 rounded-md hover:bg-surface-elevated hover:text-white transition-all">
            {isFocused ? <Shrink size={12} strokeWidth={2.5} /> : <Expand size={12} strokeWidth={2.5} />}
          </button>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-accent/20 hover:text-accent transition-all">
            <X size={12} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* WINDOW CONTENT */}
      <div className="flex-1 overflow-auto custom-scrollbar p-1">
        {children}
      </div>

      {/* RESIZE HANDLE */}
      {!isFocused && (
        <motion.div
          onPan={handleResize}
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-end justify-end p-1.5 z-50 text-text-tertiary hover:text-accent transition-colors"
        >
          <div className="w-1.5 h-1.5 border-r-[1.5px] border-b-[1.5px] border-current rounded-br-sm"></div>
        </motion.div>
      )}
    </motion.div>
  );
}