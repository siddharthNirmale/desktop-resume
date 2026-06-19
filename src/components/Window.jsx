import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Minus, Square, X } from 'lucide-react'; // We need these for minimal controls

export default function Window({ id, title, isMinimized, zIndex, onClose, onMinimize, onFocus, constraintsRef, children }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [spawnPos, setSpawnPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const randomOffset = Math.floor(Math.random() * 40) - 20;
    setSpawnPos({
      x: (window.innerWidth / 2) - 275 + randomOffset,
      y: (window.innerHeight / 2) - 200 + randomOffset,
    });
  }, []);

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      dragHandleClassName="window-header"
      dragConstraints={constraintsRef}
      onMouseDown={onFocus}
      style={{ zIndex }}
      // Changed to tighter rounded corners (rounded-md), removed heavy drop shadows, ultra-dark background
      className={`absolute bg-[#0a0a0a] border border-neutral-800/80 rounded-md shadow-2xl flex flex-col overflow-hidden text-neutral-300 ${isMinimized ? 'hidden' : ''}`}
      
      initial={{ x: spawnPos.x, y: spawnPos.y, opacity: 0, scale: 0.98 }}
      animate={
        isMaximized 
          ? { x: 0, y: 0, width: '100vw', height: '100vh', borderRadius: '0px', opacity: 1, scale: 1 }
          : { x: spawnPos.x, y: spawnPos.y, width: 550, height: 400, borderRadius: '0.375rem', opacity: 1, scale: 1 }
      }
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.1 } }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {/* Hyper-Minimal Title Bar */}
      <div 
        onDoubleClick={() => setIsMaximized(!isMaximized)} 
        // No distinct background color for the header, just a subtle bottom border
        className={`window-header h-10 px-4 flex items-center justify-between border-b border-neutral-800/50 select-none ${isMaximized ? 'cursor-default' : 'cursor-move'}`}
      >
        {/* Left-aligned, quiet title */}
        <span className="text-xs font-medium text-neutral-500 tracking-wide">
          {title}
        </span>
        
        {/* Clean, monochrome controls with no background colors */}
        <div className="flex items-center gap-4 z-10 text-neutral-600">
          <button 
            onClick={onMinimize} 
            className="hover:text-white transition-colors flex items-center justify-center"
          >
            <Minus size={14} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)} 
            className="hover:text-white transition-colors flex items-center justify-center"
          >
            <Square size={12} strokeWidth={1.5} />
          </button>
          <button 
            onClick={onClose} 
            className="hover:text-white transition-colors flex items-center justify-center"
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-[#0a0a0a] custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
}