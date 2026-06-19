import { motion } from 'framer-motion';

export default function Window({ id, title, isOpen, isMinimized, zIndex, onClose, onMinimize, onFocus, children }) {
  if (!isOpen || isMinimized) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragHandleClassName="window-header"
      onMouseDown={onFocus}
      style={{ zIndex }}
      // Ultra-dark background, subtle borders, sleek shadow
      className="absolute w-[550px] h-[400px] bg-[#0c0c0c] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-neutral-800 flex flex-col overflow-hidden text-gray-200"
      initial={{ x: 100, y: 100, opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15 }}
    >
      {/* macOS Style Title Bar */}
      <div className="window-header cursor-move bg-[#111111] px-4 py-3 flex items-center border-b border-neutral-800/80 relative select-none">
        
        {/* Traffic Light Controls */}
        <div className="flex gap-2 z-10">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ed6a5e] hover:bg-[#ed6a5e]/80 transition-colors" />
          <button onClick={onMinimize} className="w-3 h-3 rounded-full bg-[#f4bf4f] hover:bg-[#f4bf4f]/80 transition-colors" />
          <button className="w-3 h-3 rounded-full bg-[#61c554] hover:bg-[#61c554]/80 transition-colors cursor-not-allowed" />
        </div>

        {/* Centered Muted Title */}
        <span className="absolute left-1/2 -translate-x-1/2 text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
          {title}
        </span>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-[#0c0c0c] custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
}