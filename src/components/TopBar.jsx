import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function TopBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Swapped bg and border to global surface variables
    <div className="absolute top-0 left-0 w-full h-8 bg-surface-dark border-b border-surface-border flex items-center justify-between px-6 z-[99999] select-none">
      
      {/* Left: Identity */}
      <div className="flex items-center gap-6">
        {/* Applied global micro-typography and font-primary */}
        <span className="text-micro font-bold text-white uppercase tracking-super-wide font-primary">
          SIDDHARTH NIRMALE
        </span>
      </div>

      {/* Right: Functional Links & Time */}
      <div className="flex items-center gap-6 text-neutral-500">
        {/* Swapped hover to use your global accent color (Red) and updated your Github username */}
        <a href="https://github.com/siddharthNirmale" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
          <FiGithub size={12} />
        </a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
          <FiLinkedin size={12} />
        </a>
        <a href="mailto:your@email.com" className="hover:text-accent transition-colors">
          <FiMail size={12} />
        </a>
        
        {/* Separator - mapped to surface-border */}
        <div className="w-[1px] h-3 bg-surface-border" />
        
        {/* Applied global micro-typography */}
        <span className="text-micro font-bold text-neutral-400 uppercase tracking-super-wide font-primary">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}