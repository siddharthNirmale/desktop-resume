import { useState, useEffect } from 'react';
import { Sun, Activity, Mail } from 'lucide-react';

export default function TopBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000); // Updated to seconds for more precision
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-10 flex items-center justify-between px-8 z-[9999] select-none backdrop-blur-md">
      
      {/* Left: Identity */}
      <div className="flex items-center">
        <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em] font-primary opacity-90">
          Siddharth Nirmale
        </span>
      </div>

      {/* Right: System Status & Time */}
      <div className="flex items-center gap-6">
        
        {/* Status Icons - Matching the Design */}
        <div className="flex items-center gap-4 text-text-secondary">
          <button className="hover:text-white transition-colors">
            <Sun size={15} strokeWidth={2} />
          </button>
          <button className="hover:text-white transition-colors">
            <Activity size={15} strokeWidth={2} />
          </button>
          <button className="hover:text-white transition-colors relative">
            <Mail size={15} strokeWidth={2} />
            {/* Subtle notification dot */}
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#0A84FF] rounded-full border border-desktop" />
          </button>
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] h-3.5 bg-surface-border" />
        
        {/* Time - Matching "09:57 PM" format from design */}
        <span className="text-[11px] font-bold text-white uppercase tracking-widest font-primary">
          {time.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })}
        </span>
      </div>
    </div>
  );
}