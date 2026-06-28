import { Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LearningWidget({ 
  constraintsRef, 
  zIndex, 
  onFocus,
  progress = 55, 
  topic = "Frontend Optimization",
  subtopic = "Next.js"
}) {
  const activeSegments = Math.round((progress / 100) * 5);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.08} 
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }} 
      whileDrag={{ cursor: "grabbing" }} 
      className="absolute top-60 right-6 w-[280px] bg-[#1C1C1E]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4.5 cursor-grab flex flex-col gap-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] font-primary select-none pointer-events-auto"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
    >
      {/* Widget Header */}
      <div className="flex justify-between items-center px-0.5">
        <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
          Focus
        </span>
      </div>

      <div className="flex flex-col gap-4 w-full">
        
        {/* Subject Content Row */}
        <div className="flex items-center gap-3.5 px-0.5">
          <div className="flex items-center justify-center h-[38px] w-[38px] rounded-full bg-white/[0.03] border border-white/5 flex-shrink-0 shadow-inner">
            <Target size={16} strokeWidth={1.5} className="text-accent drop-shadow-[0_0_6px_rgba(10,132,255,0.2)]" />
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="text-[15px] font-medium text-white/95 tracking-tight leading-none truncate">
               {topic}
            </h3>
            <span className="text-[11px] font-medium text-white/40 truncate">
              {subtopic}
            </span>
          </div>
        </div>

        {/* Segmented Progress Tracker */}
        <div className="flex flex-col gap-2 px-0.5">
          <div className="flex justify-between items-center text-[11px] font-medium tracking-normal">
            <span className="text-white/40">
              Progress
            </span>
            <span className="text-accent font-semibold tabular-nums">
              {progress}%
            </span>
          </div>
          
          {/* Segmented Track Bar Grid */}
          <div className="flex gap-1.5 h-[4px] w-full mt-0.5">
            {[1, 2, 3, 4, 5].map((step) => (
              <div 
                key={step} 
                className={`flex-1 rounded-full transition-all duration-300 ${
                  step <= activeSegments 
                    ? 'bg-accent shadow-[0_0_6px_var(--color-accent)]' 
                    : 'bg-white/[0.04]' 
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}