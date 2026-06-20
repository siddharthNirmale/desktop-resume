import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ClockWidget() {
  const [time, setTime] = useState(new Date());

  // Update every minute (since we dropped the seconds)
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000); // 60,000ms = 1 min
    
    // Also run an interval to catch the exact second the minute turns over
    const syncTimer = setTimeout(() => {
      setTime(new Date());
      setInterval(() => setTime(new Date()), 60000);
    }, (60 - new Date().getSeconds()) * 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(syncTimer);
    };
  }, []);

  // Format hours and minutes to always be 2 digits (e.g., "09", "22")
  const hoursStr = time.getHours().toString().padStart(2, '0');
  const minutesStr = time.getMinutes().toString().padStart(2, '0');
  
  // Get concise date string (e.g., "SAT 20")
  const dayStr = time.toLocaleDateString([], { weekday: 'short' }).toUpperCase();
  const dateStr = time.getDate();

  return (
    <motion.div
      drag
      dragMomentum={false}
      // Flat, opaque dark theme container
      className="absolute top-3 right-3 w-44 h-44 bg-[#1a1a1a] rounded-3xl border border-neutral-800 flex flex-col justify-between p-4 cursor-move z-[1]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Top Header: System Status style */}
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
          Local Time
        </span>
        {/* Signature Red Accent Dot */}
        <div className="w-2 h-2 rounded-full bg-[#E51919]" />
      </div>

      {/* Center: Stacked Digital Typographical Clock */}
      <div className="flex flex-col leading-[0.85] tracking-tighter mt-2">
        {/* Crisp white for the hour */}
        <span className="text-[4rem] font-medium text-white">{hoursStr}</span>
        {/* Muted grey for the minute, creating visual hierarchy */}
        <span className="text-[4rem] font-medium text-neutral-600">{minutesStr}</span>
      </div>

      {/* Bottom: Date Info */}
      <div className="flex justify-start items-center mt-1">
        <span className="text-[10px] font-bold tracking-widest text-neutral-400">
          {dayStr} <span className="text-[#E51919]">{dateStr}</span>
        </span>
      </div>
    </motion.div>
  );
}