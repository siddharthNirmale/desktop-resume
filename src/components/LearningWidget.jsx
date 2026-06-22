import { FiTarget } from 'react-icons/fi';
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
      // Standardized to surface-dark, surface-border, rounded-3xl, and added shadow-xl
      className="absolute top-60 right-3 w-64 bg-surface-dark border border-surface-border rounded-3xl p-4 cursor-grab flex flex-col gap-3 shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Integrated Header - Matches Clock and Github Widgets exactly */}
      <div className="flex justify-between items-center px-1 select-none">
        <span className="text-micro font-bold text-neutral-500 uppercase tracking-super-wide font-primary">
          FOCUS
        </span>
      </div>

      <div className="flex flex-col gap-5 p-2 w-full">
        {/* Dynamic Subject Content */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            {/* Swapped to neutral-500 */}
            <FiTarget size={16} strokeWidth={2} className="text-neutral-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            {/* Added font-primary for standard typography */}
            <h3 className="text-sm font-medium text-white tracking-wide leading-none font-primary">
               {topic}
            </h3>
            {/* Standardized to text-xs and neutral-400 */}
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider font-mono">
              {subtopic}
            </span>
          </div>
        </div>

        {/* Dynamic Segmented Progress Bar */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            {/* Standardized typography */}
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider font-mono">
              Progress
            </span>
            {/* Swapped to text-accent */}
            <span className="text-xs font-medium text-accent uppercase tracking-wider font-mono">
              {progress}%
            </span>
          </div>
          
          <div className="flex gap-1 h-1 w-full">
            {[1, 2, 3, 4, 5].map((step) => (
              <div 
                key={step} 
                className={`flex-1 rounded-full transition-colors duration-500 ${
                  step <= activeSegments 
                    // Swapped background colors to your global variables
                    ? 'bg-accent' 
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