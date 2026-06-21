import { motion, useMotionValue } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Minus, X, Maximize2, Minimize2 } from 'lucide-react';

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
      // Adjusted rounding to accommodate tighter padding without weird clipping
      className={`absolute bg-black border-[1.5px] border-zinc-900 rounded-[1.5rem] shadow-2xl flex flex-col overflow-hidden ${isMinimized ? 'hidden' : ''}`}
      initial={{ top: spawnPos.top, left: spawnPos.left, opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Header: Slimmed down height and minimal horizontal padding */}
      <div className="window-header h-9 px-3 flex items-center justify-between border-b-[1.5px] border-zinc-900 bg-black select-none cursor-grab active:cursor-grabbing">
        <div className="flex items-center p-2 gap-2">
          {/* Slightly smaller red dot to match the tighter header */}
          <div className="w-2 h-2 rounded-full bg-[#E51919] shadow-[0_0_8px_rgba(229,25,25,0.4)]" />
          
          <span className="text-[9px] font-['NDot',_monospace] font-bold text-white uppercase tracking-[0.2em]">{title}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-500">
          <button onClick={onMinimize} className="hover:text-white transition-colors">
            <Minus size={14} strokeWidth={2} />
          </button>
          <button onClick={toggleFocus} className="hover:text-white transition-colors">
            {isFocused ? <Minimize2 size={14} strokeWidth={2} /> : <Maximize2 size={14} strokeWidth={2} />}
          </button>
          <button onClick={onClose} className="hover:text-[#E51919] transition-colors">
            <X size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
      
      {/* Content Area: Dropped to p-1 for that strict minimum bezel */}
      <div className="flex-1 overflow-auto custom-scrollbar bg-black text-zinc-300 p-0">
        {children}
      </div>
      
      {/* Resize Handle: Tucked in closer to the corner */}
      {!isFocused && (
        <motion.div
          onPan={handleResize}
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-end justify-end p-2 z-50 text-zinc-700 hover:text-[#E51919] transition-colors"
        >
          <div className="w-1.5 h-1.5 border-r-[2px] border-b-[2px] border-current"></div>
        </motion.div>
      )}
    </motion.div>
  );
}