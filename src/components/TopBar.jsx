import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function TopBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-8 bg-[#0F0F0F] border-b border-neutral-800 flex items-center justify-between px-6 z-[99999] select-none">
      
      {/* Left: Identity */}
      <div className="flex items-center gap-6">
        <span className="text-[9px] font-bold text-white uppercase tracking-[0.2em]">
          SIDDHARTH NIRMALE
        </span>
      </div>

      {/* Right: Functional Links & Time */}
      <div className="flex items-center gap-6 text-neutral-500">
        <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
          <FiGithub size={12} />
        </a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
          <FiLinkedin size={12} />
        </a>
        <a href="mailto:your@email.com" className="hover:text-white transition-colors">
          <FiMail size={12} />
        </a>
        
        {/* Separator */}
        <div className="w-[1px] h-3 bg-neutral-800" />
        
        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}