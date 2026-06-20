import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ClockWidget({ constraintsRef, zIndex, onFocus }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000); 
    const syncTimer = setTimeout(() => {
      setTime(new Date());
      setInterval(() => setTime(new Date()), 60000);
    }, (60 - new Date().getSeconds()) * 1000);
    return () => { clearInterval(timer); clearTimeout(syncTimer); };
  }, []);

  const hoursStr = time.getHours().toString().padStart(2, '0');
  const minutesStr = time.getMinutes().toString().padStart(2, '0');
  const dayStr = time.toLocaleDateString([], { weekday: 'short' }).toUpperCase();
  const dateStr = time.getDate();

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      onPointerDown={onFocus}
      style={{ zIndex }}
      className="absolute top-10 right-3 w-44 h-44 bg-[#1a1a1a] rounded-3xl border border-neutral-800 flex flex-col justify-between p-4 cursor-move"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Local Time</span>
        <div className="w-2 h-2 rounded-full bg-[#E51919]" />
      </div>
      <div className="flex flex-col leading-[0.85] tracking-tighter mt-2">
        <span className="text-[4rem] font-medium text-white">{hoursStr}</span>
        <span className="text-[4rem] font-medium text-neutral-600">{minutesStr}</span>
      </div>
      <div className="flex justify-start items-center mt-1">
        <span className="text-[10px] font-bold tracking-widest text-neutral-400">
          {dayStr} <span className="text-[#E51919]">{dateStr}</span>
        </span>
      </div>
    </motion.div>
  );
}