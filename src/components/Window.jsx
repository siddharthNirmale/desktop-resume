import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Minus, Square, X } from 'lucide-react';

export default function Window({ id, title, isMinimized, zIndex, onClose, onMinimize, onFocus, constraintsRef, children }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [spawnPos, setSpawnPos] = useState({ x: 0, y: 0 });
  
  // Track the dynamic width and height of the window
  const [size, setSize] = useState({ width: 550, height: 400 });

  useEffect(() => {
    const randomOffset = Math.floor(Math.random() * 40) - 20;
    setSpawnPos({
      x: (window.innerWidth / 2) - 275 + randomOffset,
      y: (window.innerHeight / 2) - 200 + randomOffset,
    });
  }, []);

  // Framer Motion's pan handler seamlessly calculates mouse movement (deltas)
  const handleResize = (event, info) => {
    setSize((prev) => ({
      // Enforce minimum dimensions so the window doesn't break UI components
      width: Math.max(320, prev.width + info.delta.x),
      height: Math.max(250, prev.height + info.delta.y),
    }));
  };

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      dragHandleClassName="window-header"
      dragConstraints={constraintsRef}
      onMouseDown={onFocus}
      style={{ zIndex }}
      className={`absolute bg-[#0a0a0a] border border-neutral-800/80 rounded-md shadow-2xl flex flex-col overflow-hidden text-neutral-300 ${isMinimized ? 'hidden' : ''}`}
      
      initial={{ x: spawnPos.x, y: spawnPos.y, opacity: 0, scale: 0.98 }}
      animate={
        isMaximized 
          ? { x: 0, y: 0, width: '100vw', height: '100vh', borderRadius: '0px', opacity: 1, scale: 1 }
          // Inject our dynamic size state here
          : { x: spawnPos.x, y: spawnPos.y, width: size.width, height: size.height, borderRadius: '0.375rem', opacity: 1, scale: 1 }
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

      {/* Custom Resizer Grip (Hidden when maximized) */}
      {!isMaximized && (
        <motion.div
          onPan={handleResize}
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-end justify-end p-1.5 z-50 text-neutral-600 hover:text-white transition-colors"
        >
          {/* Subtle minimal grip lines */}
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 10L10 8V10H8ZM4 10L10 4V6L6 10H4ZM0 10L10 0V2L2 10H0Z" fill="currentColor"/>
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}