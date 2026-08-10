import { motion } from 'framer-motion';

export default function Background() {
  return (
    // Outer container hides the overflow of the oversized background
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        // Make the div larger than the screen so we have room to slide it
        className="absolute inset-[-120px]"
        style={{
          backgroundImage: `radial-gradient(var(--color-desktop-dot) 1px, transparent 1px)`,
          backgroundSize: '12px 12px',
          // Ensure it leverages the GPU
          willChange: 'transform',
        }}
        // Animate x/y instead of backgroundPosition for buttery 60fps
        animate={{
          x: [0, -120],
          y: [0, -120],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: 'linear',
        }}
      />
    </div>
  );
}
