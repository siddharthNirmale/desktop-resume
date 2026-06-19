import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Added constraintsRef prop
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

  // Notice we removed the "if (!isOpen) return null" line here!

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      dragHandleClassName="window-header"
      dragConstraints={constraintsRef} // 🛑 This traps the window inside the screen!
      onMouseDown={onFocus}
      style={{ zIndex }}
      className={`absolute bg-[#0c0c0c] shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-neutral-800 flex flex-col overflow-hidden text-gray-200 ${isMinimized ? 'hidden' : ''}`}
      
      initial={{ x: spawnPos.x, y: spawnPos.y, opacity: 0, scale: 0.95 }}
      animate={
        isMaximized 
          ? { x: 0, y: 0, width: '100vw', height: '100vh', borderRadius: '0px', opacity: 1, scale: 1 }
          : { x: spawnPos.x, y: spawnPos.y, width: 550, height: 400, borderRadius: '0.75rem', opacity: 1, scale: 1 }
      }
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }} // 💨 Smooth close animation
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div 
        onDoubleClick={() => setIsMaximized(!isMaximized)} 
        className={`window-header bg-[#111111] px-4 py-3 flex items-center border-b border-neutral-800/80 relative select-none ${isMaximized ? 'cursor-default' : 'cursor-move'}`}
      >
        <div className="flex gap-2 z-10">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ed6a5e] hover:bg-[#ed6a5e]/80 transition-colors" />
          <button onClick={onMinimize} className="w-3 h-3 rounded-full bg-[#f4bf4f] hover:bg-[#f4bf4f]/80 transition-colors" />
          <button onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-[#61c554] hover:bg-[#61c554]/80 transition-colors" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
          {title}
        </span>
      </div>

      <div className="flex-1 overflow-auto bg-[#0c0c0c] custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
}