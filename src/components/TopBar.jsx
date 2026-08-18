import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { variants } from '../lib/motion';

// ============================================================
// FORMATTERS (Hoisted out of the render cycle for performance)
// ============================================================
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

// ============================================================
// TOP BAR COMPONENT
// ============================================================
export default function TopBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header
      className="
        custom-topbar
        w-full h-full
        flex items-center justify-between px-4
        bg-[var(--color-surface-dark)]/70 backdrop-blur-xl
        border-b border-[var(--color-surface-border)]
        shadow-sm font-primary select-none
      "
    >
      {/* Left Menu Cluster */}
      <div className="flex items-center gap-2.5">

        <span className="topbar-text text-[13px] font-heading font-semibold text-[var(--color-text)] tracking-tight cursor-default pr-2">
          Siddharth Nirmale
        </span>
        
        {/* Command Palette Hint */}
        <button 
          onClick={() => {
            const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
            window.dispatchEvent(event);
          }}
          className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded border border-[var(--color-surface-border)] bg-[var(--color-surface)]/50 hover:bg-[var(--color-surface-hover)] transition-colors cursor-default text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
          title="Search (Cmd + K)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span className="text-[10px] font-medium opacity-80 tracking-widest">⌘K</span>
        </button>
      </div>

      {/* Right System Tray Cluster */}
      <div className="topbar-icons flex items-center gap-4 text-[var(--color-text-secondary)]">
        {/* External Links */}
        <motion.a
          href="https://github.com/siddharthNirmale"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--color-text)] transition-colors cursor-default inline-flex"
          title="GitHub Profile"
          whileHover="hoverSubtle"
          whileTap="tap"
          variants={variants}
        >
          <FiGithub size={13} />
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/siddharth-nirmale"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--color-text)] transition-colors cursor-default inline-flex"
          title="LinkedIn Profile"
          whileHover="hoverSubtle"
          whileTap="tap"
          variants={variants}
        >
          <FiLinkedin size={13} />
        </motion.a>
        <motion.a
          href="mailto:siddharth175nirmale1@gmail.com"
          className="hover:text-[var(--color-text)] transition-colors cursor-default inline-flex"
          title="Send Email"
          whileHover="hoverSubtle"
          whileTap="tap"
          variants={variants}
        >
          <FiMail size={13} />
        </motion.a>

        {/* Hairline Divider */}
        <div className="topbar-divider w-[1px] h-3 bg-[var(--color-divider)]" />

        {/* Calendar Date & Live Clock */}
        <span className="topbar-text text-[13px] font-medium text-[var(--color-text)] tracking-normal cursor-default whitespace-nowrap">
          {dateFormatter.format(time)} &nbsp; {timeFormatter.format(time)}
        </span>
      </div>
    </header>
  );
}
