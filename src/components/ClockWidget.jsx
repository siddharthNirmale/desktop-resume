import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ClockWidget({ constraintsRef, zIndex, onFocus }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const displayHoursStr = (hours % 12 || 12).toString().padStart(2, '0');
  const minutesStr = time.getMinutes().toString().padStart(2, '0');
  const secondsStr = time.getSeconds().toString().padStart(2, '0');
  const amPm = hours >= 12 ? 'PM' : 'AM';
  
  const dayStr = time.toLocaleDateString([], { weekday: 'short' });
  const dateStr = time.getDate();
  const monthStr = time.toLocaleDateString([], { month: 'short' });

  // Prevents the progress bar from animating "backwards" when hitting 0
  const isResetting = time.getSeconds() === 0;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.15} 
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }} 
      whileDrag={{ scale: 1.02, cursor: "grabbing" }} 
      className="absolute top-10 right-3 w-64 bg-surface-dark border border-surface-border rounded-3xl p-4 cursor-grab flex flex-col gap-3 shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Integrated Header */}
      <div className="flex justify-between items-center px-1 select-none">
        {/* Using the new global micro-typography variables */}
        <span className="text-micro font-bold text-neutral-500 uppercase tracking-super-wide font-primary">
          CLOCK
        </span>
      </div>

      <div className="flex flex-col items-center justify-center p-2 gap-4 w-full h-full">
        {/* Time Display */}
        <div className="flex items-start justify-center gap-2 w-full mt-2">
          <span className="text-5xl font-mono tracking-wider text-white leading-none">
            {displayHoursStr}:{minutesStr}
          </span>
          
          <div className="flex flex-col items-start gap-1 mt-1">
            {/* AM/PM using accent color and micro-typography */}
            <span className="text-micro font-bold text-accent uppercase tracking-super-wide font-mono">
              {amPm}
            </span>
            <span className="text-xs font-mono text-neutral-400 w-5 text-left leading-none">
              {secondsStr}
            </span>
          </div>
        </div>

        {/* Date Readout */}
        <div className="flex items-center justify-center gap-3 w-full">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider font-mono">
            {dayStr}
          </span>
          {/* Subtle separator dot mapped to your surface border color */}
          <div className="w-1 h-1 bg-surface-border rounded-full" /> 
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider font-mono">
            {monthStr} {dateStr}
          </span>
        </div>

        {/* Flat minute progress bar */}
        <div className="w-full h-1 bg-surface rounded-full overflow-hidden mt-2">
          <motion.div 
            className="h-full bg-accent"
            animate={{ width: `${(time.getSeconds() / 60) * 100}%` }}
            transition={{ ease: "linear", duration: isResetting ? 0 : 1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}