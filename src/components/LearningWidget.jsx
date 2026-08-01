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
      // Increased blur, removed shadow, and applied rounded-[24px] for the cohesive Apple look
      className="custom-widget absolute top-60 right-6 w-[280px] bg-[#1C1C1E]/50 backdrop-blur-2xl border border-white/5 rounded-[24px] p-4.5 cursor-grab flex flex-col gap-3.5 font-primary select-none pointer-events-auto transition-colors duration-250"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
    >
      {/* Widget Header */}
      <div className="flex justify-between items-center px-0.5">
        <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider transition-colors duration-250">
          Focus
        </span>
      </div>

      <div className="flex flex-col gap-4 w-full">

        {/* Subject Content Row */}
        <div className="flex items-center gap-3.5 px-0.5">
          {/* Removed shadow-inner to keep it flat */}
          <div className="flex items-center justify-center h-[38px] w-[38px] rounded-full bg-[var(--color-surface-border)] border border-transparent flex-shrink-0 transition-colors duration-250">
            {/* Removed drop-shadow-md to keep it flat */}
            <Target size={16} strokeWidth={1.5} className="text-[var(--color-accent)] transition-colors duration-250" />
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="text-[15px] font-medium text-[var(--color-text)] tracking-tight leading-none truncate transition-colors duration-250">
              {topic}
            </h3>
            <span className="text-[11px] font-medium text-[var(--color-text-secondary)] truncate transition-colors duration-250">
              {subtopic}
            </span>
          </div>
        </div>

        {/* Segmented Progress Tracker */}
        <div className="flex flex-col gap-2 px-0.5">
          <div className="flex justify-between items-center text-[11px] font-medium tracking-normal">
            <span className="text-[var(--color-text-tertiary)] transition-colors duration-250">
              Progress
            </span>
            <span className="text-[var(--color-accent)] font-semibold tabular-nums transition-colors duration-250">
              {progress}%
            </span>
          </div>

          {/* Segmented Track Bar Grid */}
          <div className="flex gap-1.5 h-[4px] w-full mt-0.5">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                // Removed the glow/shadow on the active segments for the minimal aesthetic
                className={`flex-1 rounded-full transition-all duration-300 ${step <= activeSegments
                  ? 'bg-[var(--color-accent)]'
                  : 'bg-[var(--color-surface-border)]'
                  }`}
              />
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
