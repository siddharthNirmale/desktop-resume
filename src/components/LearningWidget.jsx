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
      whileDrag={{ cursor: "grabbing", scale: 1.02 }}
      className="custom-widget absolute top-60 right-6 w-[310px] p-5 cursor-grab flex flex-col select-none pointer-events-auto
                 bg-[#eef2f5] dark:bg-[#1a1c23]
                 rounded-[28px]
                 border-t-[3px] border-t-white/80 dark:border-t-white/10
                 border-b-[8px] border-b-[#cdd4db] dark:border-b-[#0d0e12]
                 border-x-[4px] border-x-[#e2e8f0] dark:border-x-[#15171d]
                 shadow-[0_25px_50px_rgba(0,10,40,0.25)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.8)]
                 font-primary transition-colors duration-250 min-h-[190px]"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
    >
      {/* Decorative Top Pill (Industrial design detail) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-[#cdd4db] dark:bg-[#0d0e12] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />

      {/* Widget Header */}
      <div className="flex justify-between items-center px-1 mt-1 mb-3">
        <span className="text-[13px] font-black text-[#0066ff] dark:text-[#6699ff] uppercase tracking-widest drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
          Focus Area
        </span>
        <div className="px-2.5 py-1 bg-[#ff6b1a] rounded-lg shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),_0_2px_4px_rgba(255,107,26,0.3)]">
          <span className="text-[10px] font-black text-white tabular-nums tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
            {progress}%
          </span>
        </div>
      </div>

      {/* Recessed Digital Screen Area */}
      <div className="relative flex-1 p-4
                      bg-[#f8fafc] dark:bg-[#111317]
                      rounded-[20px]
                      border-t-[3px] border-t-[#cdd4db] dark:border-t-[#000]
                      border-b-[2px] border-b-white dark:border-b-[#2c3039]
                      border-x-[2px] border-x-[#e2e8f0] dark:border-x-[#15171d]
                      shadow-[inset_0_6px_12px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_8px_16px_rgba(0,0,0,0.6)]
                      flex flex-col justify-between gap-4">

        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.1] dark:opacity-[0.05] rounded-[20px]"
          style={{ backgroundImage: 'radial-gradient(#0066ff 1px, transparent 1px)', backgroundSize: '10px 10px' }}
        />

        {/* Subject Content Row */}
        <div className="relative z-10 flex items-center gap-3.5">
          {/* Extruded Toy Target Icon Box */}
          <div className="flex items-center justify-center h-[48px] w-[48px] rounded-[14px]
                          bg-[#0066ff] border-b-[4px] border-[#003399]
                          flex-shrink-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),_0_4px_8px_rgba(0,102,255,0.3)]">
            <Target size={24} strokeWidth={2.5} className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]" />
          </div>

          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="text-[14px] font-black text-[#223344] dark:text-white tracking-tight leading-tight truncate">
              {topic}
            </h3>
            <span className="inline-block px-2 py-0.5 w-max bg-[#d5dde5] dark:bg-[#2c3039] rounded-[6px] text-[11px] font-bold text-[#0066ff] dark:text-[#6699ff] truncate shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
              {subtopic}
            </span>
          </div>
        </div>

        {/* Segmented Chunk Progress Tracker */}
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#8899aa] dark:text-[#64748b]">
            <span>Milestones</span>
            <span>{activeSegments} / 5 Done</span>
          </div>

          {/* Segmented Battery Keycaps */}
          <div className="flex gap-2 h-[8px] w-full">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex-1 rounded-full transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] ${step <= activeSegments
                    ? 'bg-gradient-to-r from-[#ff6b1a] to-[#ff9933] shadow-[0_0_8px_rgba(255,107,26,0.5)]'
                    : 'bg-[#d5dde5] dark:bg-[#2c3039]'
                  }`}
              />
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
