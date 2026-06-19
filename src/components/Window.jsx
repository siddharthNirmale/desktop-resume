import { motion, useMotionValue } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Minus, Square, X } from 'lucide-react';

export default function Window({ id, title, isMinimized, zIndex, onClose, onMinimize, onFocus, constraintsRef, children }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [spawnPos, setSpawnPos] = useState(null);
  
  // 1. GPU-Accelerated Motion Values (Bypasses React lag!)
  const width = useMotionValue(550);
  const height = useMotionValue(400);
  
  // 2. We explicitly track X and Y so they don't fight with the resize updates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // We use CSS top/left for the absolute initial spawn position
  useEffect(() => {
    const randomOffset = Math.floor(Math.random() * 40) - 20;
    setSpawnPos({
      top: (window.innerHeight / 2) - 200 + randomOffset,
      left: (window.innerWidth / 2) - 275 + randomOffset,
    });
  }, []);

  // 3. Synchronous resize math pushed straight to the style tag
  const handleResize = (event, info) => {
    width.set(Math.max(320, width.get() + info.delta.x));
    height.set(Math.max(250, height.get() + info.delta.y));
  };

  // Wait for the spawn position to calculate so it doesn't flicker at 0,0
  if (!spawnPos) return null;

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      dragHandleClassName="window-header"
      dragConstraints={constraintsRef}
      onMouseDown={onFocus}
      // Inject the motion values directly into the style prop
      style={{ 
        zIndex, 
        top: spawnPos.top, 
        left: spawnPos.left,
        x, 
        y, 
        width, 
        height 
      }}
      className={`absolute bg-[#0a0a0a] border border-neutral-800/80 rounded-md shadow-2xl flex flex-col overflow-hidden text-neutral-300 ${isMinimized ? 'hidden' : ''}`}
      
      initial={{ opacity: 0, scale: 0.98 }}
      animate={
        isMaximized 
          // Animate overrides the style values when maximized
          ? { x: -spawnPos.left, y: -spawnPos.top, width: '100vw', height: '100vh', borderRadius: '0px', opacity: 1, scale: 1 }
          // When un-maximized, it smoothly reverts back to the underlying style motion values!
          : { borderRadius: '0.375rem', opacity: 1, scale: 1 } 
      }
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.1 } }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {/* Hyper-Minimal Title Bar */}
      <div 
        onDoubleClick={() => setIsMaximized(!isMaximized)} 
        className={`window-header h-10 px-4 flex items-center justify-between border-b border-neutral-800/50 select-none ${isMaximized ? 'cursor-default' : 'cursor-move'}`}
      >
        <span className="text-xs font-medium text-neutral-500 tracking-wide">
          {title}
        </span>
        
        <div className="flex items-center gap-4 z-10 text-neutral-600">
          <button onClick={onMinimize} className="hover:text-white transition-colors flex items-center justify-center">
            <Minus size={14} strokeWidth={1.5} />
          </button>
          <button onClick={() => setIsMaximized(!isMaximized)} className="hover:text-white transition-colors flex items-center justify-center">
            <Square size={12} strokeWidth={1.5} />
          </button>
          <button onClick={onClose} className="hover:text-white transition-colors flex items-center justify-center">
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-[#0a0a0a] custom-scrollbar relative">
        {children}
      </div>

      {/* Custom Resizer Grip */}
      {!isMaximized && (
        <motion.div
          onPan={handleResize}
          onPointerDown={(e) => e.stopPropagation()} // Stop accidental drag events
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-end justify-end p-1.5 z-50 text-neutral-600 hover:text-white transition-colors"
        >
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 10L10 8V10H8ZM4 10L10 4V6L6 10H4ZM0 10L10 0V2L2 10H0Z" fill="currentColor"/>
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}