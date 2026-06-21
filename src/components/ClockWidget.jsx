import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BaseWidget from './BaseWidget';

export default function ClockWidget({ constraintsRef, zIndex, onFocus }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // 1-second interval keeps the widget feeling active
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Time calculations
  const hours = time.getHours();
  const displayHoursStr = (hours % 12 || 12).toString().padStart(2, '0');
  const minutesStr = time.getMinutes().toString().padStart(2, '0');
  const secondsStr = time.getSeconds().toString().padStart(2, '0');
  const amPm = hours >= 12 ? 'PM' : 'AM';
  
  // Date calculations
  const dayStr = time.toLocaleDateString([], { weekday: 'short' });
  const dateStr = time.getDate();
  const monthStr = time.toLocaleDateString([], { month: 'short' });

  return (
    <BaseWidget
      constraintsRef={constraintsRef}
      zIndex={zIndex}
      onFocus={onFocus}
      className="top-10 right-3 w-auto h-auto" 
      title="Clock" // Left blank so the widget body handles the layout
    >
      {/* The OS Container: 
        Stark black, tight border, heavily rounded, zero blur or gradients.
      */}
      <div className="relative w-full h-full rounded-[1.5rem] bg-black border-[1.5px] border-zinc-900 overflow-hidden flex flex-col p-5">
        
        

        {/* Time Display: Centered and stark */}
        <div className="flex items-center justify-center gap-2 z-10 w-full mb-2">
          {/* Main Time: Back to the signature dot-matrix/monospace look */}
          <span className="text-[3.5rem] font-['NDot',_monospace] tracking-widest text-white leading-none">
            {displayHoursStr}:{minutesStr}
          </span>
          
          {/* AM/PM and Live Seconds */}
          <div className="flex flex-col items-start gap-1">
            <span className="text-[10px] font-bold text-[#E51919] uppercase tracking-[0.2em]">
              {amPm}
            </span>
            <span className="text-[10px] font-['NDot',_monospace] text-zinc-500 w-5 text-left leading-none">
              {secondsStr}
            </span>
          </div>
        </div>

        {/* Flat Date Readout */}
        <div className="flex items-center justify-center gap-2.5 mt-auto w-full pb-2">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{dayStr}</span>
          <div className="w-1 h-1 bg-zinc-700" /> {/* Square separator instead of round for blockier feel */}
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">
            {monthStr} {dateStr}
          </span>
        </div>

        {/* Sweeping Minute Progress Bar: 
          Replaced the glowing blue with a flat, signature red track 
        */}
        <div className="absolute bottom-0 left-0 h-1.5 bg-zinc-900 w-full">
          <motion.div 
            className="h-full bg-[#E51919]"
            animate={{ width: `${(time.getSeconds() / 60) * 100}%` }}
            transition={{ ease: "linear", duration: 1 }}
          />
        </div>
      </div>
    </BaseWidget>
  );
}