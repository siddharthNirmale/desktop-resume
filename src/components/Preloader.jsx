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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black font-mono"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Increased text size and spacing for maximum readability */}
      <div className="flex flex-col items-center gap-6">
        <motion.div 
          className="text-white text-3xl md:text-5xl tracking-[0.4em] uppercase font-bold"
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.div>
        
        {/* Larger, more visible loading line */}
        <div className="w-32 h-[2px] bg-neutral-900 overflow-hidden">
          <motion.div 
            className="h-full bg-[#f02020]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}