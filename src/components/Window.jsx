import { motion, useMotionValue } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Minus, X, Expand, Shrink } from 'lucide-react';

export default function Window({ id, title, isMinimized, zIndex, onClose, onMinimize, onFocus, constraintsRef, children }) {
  const [isFocused, setIsFocused] = useState(false);
  const [spawnPos, setSpawnPos] = useState(null);
  
  const width = useMotionValue(550);
  const height = useMotionValue(400);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const randomOffset = Math.floor(Math.random() * 40) - 20;
    setSpawnPos({ top: (window.innerHeight / 2) - 200 + randomOffset, left: (window.innerWidth / 2) - 275 + randomOffset });
  }, []);

  const toggleFocus = () => {
    if (!isFocused) {
      width.set(window.innerWidth * 0.7);
      height.set(window.innerHeight * 0.7);
    } else {
      width.set(550);
      height.set(400);
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
      // Match the widgets: Flat opaque background, rounded-3xl, stark border
      className={`absolute bg-[#1a1a1a] border border-neutral-800 rounded-3xl shadow-xl flex flex-col overflow-hidden ${isMinimized ? 'hidden' : ''}`}
      initial={{ top: spawnPos.top, left: spawnPos.left, opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Redesigned Header */}
      <div className="window-header h-14 px-6 flex items-center justify-between border-b border-neutral-800 bg-[#1a1a1a] select-none cursor-grab active:cursor-grabbing">
        
        {/* Title & Active Indicator */}
        <div className="flex items-center gap-3">
          {/* Signature Red Dot */}
          <div className="w-2 h-2 rounded-full bg-[#E51919]" />
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
            {title}
          </span>
        </div>

        {/* Window Controls - Thicker stroke for a mechanical, stark hardware feel */}
        <div className="flex items-center gap-4 text-neutral-600">
          <button onClick={onMinimize} className="hover:text-white transition-colors">
            <Minus size={15} strokeWidth={2.5} />
          </button>
          <button onClick={toggleFocus} className="hover:text-white transition-colors">
            {isFocused ? <Shrink size={15} strokeWidth={2.5} /> : <Expand size={15} strokeWidth={2.5} />}
          </button>
          {/* Close button gets the signature red hover state */}
          <button onClick={onClose} className="hover:text-[#E51919] transition-colors">
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto custom-scrollbar bg-[#1a1a1a]">
        {children}
      </div>

      {/* Redesigned Resize Handle */}
      {!isFocused && (
        <motion.div
          onPan={handleResize}
          className="absolute bottom-1 right-1 w-8 h-8 cursor-se-resize flex items-end justify-end p-3 z-50 text-neutral-600 hover:text-[#E51919] transition-colors"
        >
          {/* Thicker, sharper corner indicator */}
          <div className="w-2.5 h-2.5 border-r-2 border-b-2 border-current"></div>
        </motion.div>
      )}
    </motion.div>
  );
}