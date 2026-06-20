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
      className={`absolute bg-[#0a0a0a] border border-neutral-800 rounded-xl shadow-2xl flex flex-col overflow-hidden ${isMinimized ? 'hidden' : ''}`}
      initial={{ top: spawnPos.top, left: spawnPos.left, opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="window-header h-12 px-5 flex items-center justify-between border-b border-neutral-800/50 select-none cursor-grab active:cursor-grabbing">
        <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">{title}</span>
        <div className="flex items-center gap-3 text-neutral-600">
          <button onClick={onMinimize} className="hover:text-white transition-colors"><Minus size={14} /></button>
          <button onClick={toggleFocus} className="hover:text-white transition-colors">
            {isFocused ? <Shrink size={14} /> : <Expand size={14} />}
          </button>
          <button onClick={onClose} className="hover:text-white transition-colors"><X size={14} /></button>
        </div>
      </div>
      <div className="flex-1 overflow-auto custom-scrollbar">{children}</div>
      {!isFocused && (
        <motion.div
          onPan={handleResize}
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-end justify-end p-1.5 z-50 text-neutral-700 hover:text-white"
        >
          <div className="w-1.5 h-1.5 border-r border-b border-current"></div>
        </motion.div>
      )}
    </motion.div>
  );
}