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

  // Reusable mechanical button styles for the window controls
  const controlBtnStyle = `w-[32px] h-[32px] flex items-center justify-center rounded-[10px]
                           border-b-[3px] active:border-b-0 active:translate-y-[3px]
                           transition-all duration-150 focus:outline-none cursor-pointer`;

  return (
    <motion.div
      drag={true}
      dragMomentum={false}
      dragHandleClassName="window-header-drag"
      dragConstraints={constraintsRef}
      onMouseDown={onFocus}
      style={{ zIndex, x, y, width, height }}
      className={`absolute flex flex-col overflow-hidden
                  bg-[#eef2f5] dark:bg-[#1a1c23]
                  rounded-[24px]
                  border-t-[3px] border-t-white/80 dark:border-t-white/10
                  border-b-[8px] border-b-[#cdd4db] dark:border-b-[#0d0e12]
                  border-x-[4px] border-x-[#e2e8f0] dark:border-x-[#15171d]
                  shadow-[0_25px_50px_rgba(0,10,40,0.25)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.8)]
                  transition-opacity duration-200 ${isMinimized ? 'hidden' : ''}`}
      initial={{ opacity: 0, scale: 0.5, x: spawnPos.left, y: spawnPos.top }}
      animate={{ opacity: 1, scale: 1, x: spawnPos.left, y: spawnPos.top }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8
      }}
    >
      {/* 3D Electric Blue Header Shell */}
      <div className="h-[56px] min-h-[56px] flex items-center justify-between select-none
                      bg-gradient-to-b from-[#0066ff] to-[#0044cc]
                      border-b-[4px] border-b-[#002288]
                      shadow-[inset_0_4px_6px_rgba(255,255,255,0.3)]
                      relative transition-colors duration-250 z-20">

        {/* Left Drag Area */}
        <div
          className="window-header-drag flex-1 h-full flex items-center pl-6 cursor-grab active:cursor-grabbing"
          onDoubleClick={toggleMaximize}
        >
          <div className="pointer-events-none bg-[#002288]/40 px-4 py-1.5 rounded-full border border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
            <span className="text-[13px] font-black text-white tracking-widest uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
              {title}
            </span>
          </div>
        </div>

        {/* Right Side Toy-Like Control Panel */}
        <div className="flex items-center gap-2 pr-4 h-full z-50 relative">

          {/* Minimize Icon */}
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            onPointerDown={(e) => e.stopPropagation()}
            className={`${controlBtnStyle} bg-[#f0f4f8] border-[#b0b8c4] hover:bg-white text-[#0055ff] dark:bg-[#2c3039] dark:border-[#111317] dark:text-[#6699ff]`}
            title="Minimize"
          >
            <Minus size={16} strokeWidth={3} />
          </button>

          {/* Maximize / Restore Icon */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
            onMouseDown={(e) => e.stopPropagation()}
            className={`${controlBtnStyle} bg-[#f0f4f8] border-[#b0b8c4] hover:bg-white text-[#0055ff] dark:bg-[#2c3039] dark:border-[#111317] dark:text-[#6699ff]`}
            title={isFocused ? "Restore Down" : "Maximize"}
          >
            {isFocused ? (
              <Copy size={14} strokeWidth={3} className="-scale-y-100 transform" />
            ) : (
              <Square size={14} strokeWidth={3} />
            )}
          </button>

          {/* Close Icon - Bright Orange Accent */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            onMouseDown={(e) => e.stopPropagation()}
            className={`${controlBtnStyle} bg-[#ff6b1a] border-[#b34000] hover:bg-[#ff8533] text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] ml-1`}
            title="Close"
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Window Body Workspace with Crisp Grid Detailing */}
      <div className="flex-1 overflow-auto custom-scrollbar relative bg-[#f8fafc] dark:bg-[#1a1c23] shadow-[inset_0_8px_20px_rgba(0,0,0,0.05)] transition-colors duration-250">
        {/* Y2K Minimalist Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(#0066ff 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px'
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 h-full p-2">
          {children}
        </div>
      </div>

      {/* Chunky Orange Resize Handle */}
      {!isFocused && (
        <motion.div
          onPan={handleResize}
          className="absolute bottom-1 right-1 w-[24px] h-[24px] cursor-se-resize z-50 flex items-end justify-end p-[4px]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" className="text-[#ff6b1a] drop-shadow-[1px_1px_0_rgba(255,255,255,0.8)] dark:drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]">
            <line x1="14" y1="0" x2="0" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="14" y1="7" x2="7" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}
