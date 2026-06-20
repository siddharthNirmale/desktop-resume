import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader({ onLoadingComplete }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    // 1. Text animation logic
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    // 2. Dismiss logic: Finish after 2.5 seconds
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-mono text-neutral-500 text-sm tracking-widest uppercase">
        Starting{dots}
      </div>
    </motion.div>
  );
}