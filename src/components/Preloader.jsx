import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader({ onLoadingComplete }) {
  const [text, setText] = useState('STARTING');

  // 🌟 NEW: Check theme and accent instantly so the preloader matches the user's saved OS settings!
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
      document.body.classList.add('light-theme');
    }

    const savedAccent = localStorage.getItem("os-accent");
    if (savedAccent) {
      document.documentElement.style.setProperty("--color-accent", savedAccent);
    }
  }, []);

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
      // Explicitly mapped to var(--color-desktop) to prevent flash of wrong color on load
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--color-desktop)] font-mono transition-colors duration-250"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          // Swapped text-white for dynamic text variable
          className="text-[var(--color-text)] text-3xl md:text-5xl tracking-widest uppercase font-bold transition-colors duration-250"
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.div>

        {/* Loader track mapped to surface-border */}
        <div className="w-32 h-[2px] bg-[var(--color-surface-border)] overflow-hidden transition-colors duration-250">
          <motion.div
            // Loader fill mapped perfectly to your global accent color
            className="h-full bg-[var(--color-accent)] transition-colors duration-250"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
