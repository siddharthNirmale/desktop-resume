import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContextMenu({ x, y, show, onClose, onOpenApp }) {
  const menuRef = useRef(null);

  // Close the menu if the user clicks anywhere else
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (show) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          // Ensure it stays on top of absolutely everything
          style={{ top: y, left: x, zIndex: 9999999 }}
          className="absolute w-56 bg-[#1a1a1a]/90 backdrop-blur-xl border border-neutral-800 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] p-1 text-sm text-gray-200"
        >
          <div className="flex flex-col">
            <button 
              onClick={() => { onOpenApp('terminal'); onClose(); }}
              className="w-full text-left px-3 py-1.5 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
            >
              Open Terminal Here
            </button>
            <button 
              onClick={() => { onOpenApp('notepad'); onClose(); }}
              className="w-full text-left px-3 py-1.5 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
            >
              New Note
            </button>
            
            <div className="h-[1px] bg-neutral-800 my-1 mx-2" /> {/* Divider */}
            
            <button 
              onClick={() => { alert("This could trigger a theme change in the future!"); onClose(); }}
              className="w-full text-left px-3 py-1.5 rounded-md hover:bg-blue-600 hover:text-white transition-colors flex justify-between items-center text-neutral-400 hover:text-white"
            >
              <span>Change Wallpaper...</span>
              <span className="text-[10px]">⌘W</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}