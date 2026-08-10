import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

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
      <div className="flex items-center gap-4.5">
        <span className="topbar-text text-[13px] font-semibold text-[var(--color-text)] tracking-normal cursor-default">
          Siddharth Nirmale
        </span>
      </div>

      {/* Right System Tray Cluster */}
      <div className="topbar-icons flex items-center gap-4 text-[var(--color-text-secondary)]">
        {/* External Links */}
        <a
          href="https://github.com/siddharthNirmale"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--color-text)] transition-colors cursor-default"
          title="GitHub Profile"
        >
          <FiGithub size={13} />
        </a>
        <a
          href="https://linkedin.com/in/siddharth-nirmale"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--color-text)] transition-colors cursor-default"
          title="LinkedIn Profile"
        >
          <FiLinkedin size={13} />
        </a>
        <a
          href="mailto:siddharth175nirmale1@gmail.com"
          className="hover:text-[var(--color-text)] transition-colors cursor-default"
          title="Send Email"
        >
          <FiMail size={13} />
        </a>

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
