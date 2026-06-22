import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader({ onLoadingComplete }) {
  const [text, setText] = useState('STARTING');

  useEffect(() => {
    // Sequence of boot steps
    const sequence = ['STARTING', 'INITIALIZING', 'BOOTING', 'READY'];
    let index = 0;

    const interval = setInterval(() => {
      index++;
      if (index < sequence.length) {
        setText(sequence[index]);
      } else {
        clearInterval(interval);
      }
    }, 600);

    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2500);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      // Mapped background to your global desktop color so the fade-out is seamless
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-desktop font-mono"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div 
          // Swapped hardcoded tracking for standard Tailwind tracking-widest
          className="text-white text-3xl md:text-5xl tracking-widest uppercase font-bold"
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.div>
        
        {/* Loader track mapped to surface-border */}
        <div className="w-32 h-[2px] bg-surface-border overflow-hidden">
          <motion.div 
            // Loader fill mapped perfectly to your global accent color
            className="h-full bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}