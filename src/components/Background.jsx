import { motion } from 'framer-motion';

export default function Background() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none transition-colors duration-250"
      style={{
        backgroundImage: `
          radial-gradient(
            var(--color-desktop-dot) 1px,
            transparent 1px
          )
        `,
        backgroundSize: '12px 12px',
      }}
      // Move diagonally by a multiple of the background size (12px)
      animate={{
        backgroundPosition: ['0px 0px', '-120px -120px'],
      }}
      transition={{
        repeat: Infinity,
        duration: 25, // Higher number = slower, more subtle drift
        ease: 'linear', // Linear is required so it doesn't slow down before looping
      }}
    />
  );
}
