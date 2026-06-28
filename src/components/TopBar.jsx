import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaApple } from 'react-icons/fa';

export default function TopBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Run updates every single second to keep the clock precisely synced
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="absolute top-0 left-0 w-full h-[24px] min-h-[24px] bg-[#1C1C1E]/60 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 z-[999999] select-none shadow-[0_1px_4px_rgba(0,0,0,0.3)] font-primary">
      
      {/* Left Menu Cluster */}
      <div className="flex items-center gap-4.5">
       

        {/* Application Core Branding Menu Items */}
        <span className="text-[13px] font-semibold text-white/90 tracking-normal cursor-default">
          Siddharth Nirmale
        </span>
      </div>

      {/* Right System Tray Cluster */}
      <div className="flex items-center gap-4 text-white/70">
        {/* Working External Resource Connections */}
        <a 
          href="https://github.com/siddharthNirmale" 
          target="_blank" 
          rel="noreferrer" 
          className="hover:text-white transition-colors cursor-default"
          title="GitHub Profile"
        >
          <FiGithub size={13} />
        </a>
        <a 
          href="https://linkedin.com/in/siddharth-nirmale" 
          target="_blank" 
          rel="noreferrer" 
          className="hover:text-white transition-colors cursor-default"
          title="LinkedIn Profile"
        >
          <FiLinkedin size={13} />
        </a>
        <a 
          href="mailto:siddharth175nirmale1@gmail.com" 
          className="hover:text-white transition-colors cursor-default"
          title="Send Email"
        >
          <FiMail size={13} />
        </a>
        
        {/* Hairline Divider Node */}
        <div className="w-[1px] h-3 bg-white/10" />
        
        {/* Calendar Date & Live Clock Text Block */}
        <span className="text-[13px] font-medium text-white/90 tracking-normal cursor-default whitespace-nowrap">
          {formatDate(time)} &nbsp; {formatTime(time)}
        </span>
      </div>
    </div>
  );
}