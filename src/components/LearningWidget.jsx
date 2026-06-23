import { Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LearningWidget({ 
  constraintsRef, 
  zIndex, 
  onFocus,
  progress = 60, 
  topic = "Frontend Optimization",
  subtopic = "Next.js 14"
}) {
  const activeSegments = Math.round((progress / 100) * 5);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.15} 
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }} 
      whileDrag={{ scale: 1.02, cursor: "grabbing" }} 
      // Standardized to w-[280px], rounded-2xl, p-5, and shadow-2xl
      className="absolute top-60 right-3 w-[280px] bg-surface-dark border border-surface-border rounded-2xl p-5 cursor-grab flex flex-col gap-4 shadow-2xl font-primary"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Clean Header */}
      <div className="flex justify-between items-center px-1 select-none mb-1">
        <span className="text-micro font-medium text-text-secondary uppercase tracking-super-wide">
          FOCUS
        </span>
      </div>

      <div className="flex flex-col gap-5 w-full">
        
        {/* Dynamic Subject Content */}
        <div className="flex items-center gap-4">
          {/* Wrapped the icon in a sleek surface bubble to give it more presence */}
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-surface border border-surface-border flex-shrink-0">
            <Target size={18} strokeWidth={1.5} className="text-accent" />
          </div>
          <div className="flex flex-col gap-1.5">
            {/* Match the light, clean typography of the clock */}
            <h3 className="text-base font-light text-text tracking-wide leading-none">
               {topic}
            </h3>
            <span className="text-[10px] font-medium text-text-tertiary uppercase tracking-wider font-mono">
              {subtopic}
            </span>
          </div>
        </div>

        {/* Dynamic Segmented Progress Bar */}
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-medium text-text-secondary uppercase tracking-wider font-mono">
              Progress
            </span>
            <span className="text-[10px] font-medium text-accent uppercase tracking-wider font-mono">
              {progress}%
            </span>
          </div>
          
          {/* Segmented bar utilizing global bg-accent and bg-surface */}
          <div className="flex gap-1.5 h-1.5 w-full">
            {[1, 2, 3, 4, 5].map((step) => (
              <div 
                key={step} 
                className={`flex-1 rounded-full transition-colors duration-500 ${
                  step <= activeSegments 
                    ? 'bg-accent shadow-[0_0_8px_var(--color-accent)] opacity-80' // Subtle glow on active steps
                    : 'bg-surface' 
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}