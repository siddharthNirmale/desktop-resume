import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ClockWidget() {
  const [time, setTime] = useState(new Date());

  // Update the clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate rotation angles for the hands
  const secondsDegrees = time.getSeconds() * 6; // 360deg / 60s
  const minutesDegrees = time.getMinutes() * 6 + time.getSeconds() * 0.1; // Smooth minute sweep
  const hoursDegrees = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5; // Smooth hour sweep

  return (
    <motion.div
      drag
      dragMomentum={false}
      // Matches the ultra-dark, minimal glassmorphism of your OS
      className="absolute top-8 right-8 w-48 h-56 bg-[#0a0a0a]/80 backdrop-blur-xl border border-neutral-800/80 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center cursor-move z-[9998]"
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* The Clock Face */}
      <div className="relative w-32 h-32 rounded-full border border-neutral-800/50 flex items-center justify-center bg-[#050505] shadow-inner">
        
        {/* Center Pivot Dot */}
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        
        {/* Hour Hand */}
        <div 
          className="absolute w-[3px] h-8 bg-neutral-300 rounded-full origin-bottom z-10 bottom-1/2"
          style={{ transform: `rotate(${hoursDegrees}deg)` }}
        />
        
        {/* Minute Hand */}
        <div 
          className="absolute w-[2px] h-12 bg-neutral-400 rounded-full origin-bottom z-10 bottom-1/2"
          style={{ transform: `rotate(${minutesDegrees}deg)` }}
        />
        
        {/* Second Hand (Accent Color) */}
        <div 
          className="absolute w-[1px] h-14 bg-[#ed6a5e] rounded-full origin-bottom z-10 bottom-1/2"
          style={{ transform: `rotate(${secondsDegrees}deg)` }}
        />
        
        {/* Minimalist Dial Markers */}
        <div className="absolute top-1.5 text-[8px] font-bold text-neutral-600">12</div>
        <div className="absolute right-2 text-[8px] font-bold text-neutral-600">3</div>
        <div className="absolute bottom-1.5 text-[8px] font-bold text-neutral-600">6</div>
        <div className="absolute left-2 text-[8px] font-bold text-neutral-600">9</div>
      </div>
      
      {/* Digital Text Readout */}
      <div className="mt-5 text-xs font-medium text-neutral-400 tracking-widest uppercase flex flex-col items-center gap-1">
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        {/* You can remove this sub-text or update it to your exact location */}
        <span className="text-[9px] text-neutral-600 tracking-wider">INDORE, IN</span>
      </div>
    </motion.div>
  );
}