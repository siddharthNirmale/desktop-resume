import { useState, useEffect } from "react";
import { FiGithub, FiLinkedin, FiMail, FiSliders, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

// ============================================================
// FORMATTERS (Hoisted for performance)
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

// Authentic Apple Logo SVG
function AppleLogo({ className = "w-3.5 h-3.5 fill-current" }) {
  return (
    <svg
      viewBox="0 0 170 170"
      className={className}
      aria-hidden="true"
    >
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.6-7.85-11.74-14.31-6.09-9.43-10.9-19.86-14.42-31.28-3.52-11.42-5.28-22.18-5.28-32.28 0-14.28 3.63-26.06 10.89-35.34 7.26-9.28 16.38-14.07 27.35-14.37 4.91 0 10.22 1.34 15.93 4.02 5.71 2.68 9.38 4.07 11.01 4.17 1.42 0 5.25-1.44 11.49-4.32 6.24-2.88 11.96-4.22 17.16-4.02 12.63.63 22.84 5.37 30.63 14.23-11.01 6.69-16.36 15.98-16.06 27.87.3 9.4 3.96 17.29 10.98 23.67 7.02 6.38 15.34 10.05 24.96 11.01-2.12 6.43-4.57 12.66-7.35 18.69zM119.22 31.84c0-7.39 2.7-14.15 8.11-20.28 5.41-6.13 12.08-9.98 20.02-11.56.22 1.3.33 2.45.33 3.44 0 7.39-2.73 14.33-8.19 20.81-5.46 6.49-12.33 10.37-20.61 11.66.11-1.38.34-2.74.34-4.07z" />
    </svg>
  );
}

// Menu Items for native macOS TopBar
const MENU_ITEMS = [
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "notepad", label: "Notes" },
  { id: "contact", label: "Contact" },
  { id: "terminal", label: "Terminal" },
];

export default function TopBar({
  onToggleControlCenter,
  isControlCenterOpen = false,
  toggleWindow,
  bringToFront,
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenWindow = (id) => {
    if (!toggleWindow) return;
    toggleWindow(id, "isOpen", true);
    toggleWindow(id, "isMinimized", false);
    bringToFront?.(id);
  };

  const handleTriggerSpotlight = () => {
    const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
    window.dispatchEvent(event);
  };

  return (
    <header
      className="
        custom-topbar
        w-full h-full
        flex items-center justify-between px-3 sm:px-4
        bg-[var(--color-surface-dark)]/75 backdrop-blur-2xl
        border-b border-[var(--color-surface-border)]
        shadow-xs font-primary select-none
      "
    >
      {/* ──────────────────────────────────────────
          LEFT CLUSTER: Apple Logo + Menus + Search
      ────────────────────────────────────────── */}
      <div className="flex items-center gap-1">
        {/* Apple System Icon */}
        <button
          type="button"
          onClick={onToggleControlCenter}
          className="
            flex h-[22px] px-1.5 items-center justify-center rounded-[4px]
            text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]
            active:bg-[var(--color-surface-active)] transition-colors
            cursor-default focus:outline-none
          "
          title="System Menu"
          aria-label="Apple Menu"
        >
          <AppleLogo className="w-3.5 h-3.5 fill-[var(--color-text)]" />
        </button>

        {/* Application Name */}
        <button
          type="button"
          onClick={onToggleControlCenter}
          className="
            topbar-text text-[13px] font-semibold text-[var(--color-text)]
            tracking-[-0.015em] px-1.5 py-0.5 rounded-[4px]
            hover:bg-[var(--color-surface-hover)] transition-colors
            cursor-default focus:outline-none
          "
          title="Toggle Control Center"
        >
          <span>Siddharth Nirmale</span>
        </button>

        {/* macOS Desktop Menus (Desktop view) */}
        <div className="hidden md:flex items-center gap-0.5 ml-1">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleOpenWindow(item.id)}
              className="
                text-[13px] font-normal text-[var(--color-text-secondary)]
                hover:text-[var(--color-text)] px-2 py-0.5 rounded-[4px]
                hover:bg-[var(--color-surface-hover)] transition-colors
                cursor-default focus:outline-none
              "
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Command Palette / Spotlight Search Trigger */}
        <button
          type="button"
          onClick={handleTriggerSpotlight}
          className="
            hidden sm:flex items-center gap-1.5 ml-2.5 h-[20px] px-2 rounded-[5px]
            border border-[var(--color-surface-border)] bg-[var(--color-surface-hover)]/30
            hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)]
            hover:text-[var(--color-text)] transition-colors cursor-default
            text-[11px] font-medium focus:outline-none
          "
          title="Search / Spotlight (⌘K)"
        >
          <FiSearch size={11} strokeWidth={2.2} />
          <span className="text-[10px] font-mono opacity-80 tracking-wider">⌘K</span>
        </button>
      </div>

      {/* ──────────────────────────────────────────
          RIGHT CLUSTER: System Status Tray
      ────────────────────────────────────────── */}
      <div className="topbar-icons flex items-center gap-1 sm:gap-1.5 text-[var(--color-text-secondary)]">
        {/* GitHub */}
        <a
          href="https://github.com/siddharthNirmale"
          target="_blank"
          rel="noreferrer"
          className="
            flex h-[22px] w-[24px] items-center justify-center rounded-[4px]
            hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]
            transition-colors cursor-default
          "
          title="GitHub Profile"
        >
          <FiGithub size={13} strokeWidth={2} />
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/siddharth-nirmale"
          target="_blank"
          rel="noreferrer"
          className="
            flex h-[22px] w-[24px] items-center justify-center rounded-[4px]
            hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]
            transition-colors cursor-default
          "
          title="LinkedIn Profile"
        >
          <FiLinkedin size={13} strokeWidth={2} />
        </a>

        {/* Email */}
        <a
          href="mailto:siddharth175nirmale1@gmail.com"
          className="
            flex h-[22px] w-[24px] items-center justify-center rounded-[4px]
            hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]
            transition-colors cursor-default
          "
          title="Send Email"
        >
          <FiMail size={13} strokeWidth={2} />
        </a>

        {/* Control Center Toggle */}
        <button
          type="button"
          onClick={onToggleControlCenter}
          title="Control Center"
          aria-label="Control Center"
          className={`
            flex h-[22px] px-1.5 items-center justify-center rounded-[4px]
            transition-all cursor-default focus:outline-none
            ${
              isControlCenterOpen
                ? "bg-[var(--color-accent)] text-white shadow-xs"
                : "hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
            }
          `}
        >
          <FiSliders size={12} strokeWidth={2.2} />
        </button>

        {/* Hairline Divider */}
        <div className="topbar-divider w-[1px] h-3.5 bg-[var(--color-divider)] mx-1" />

        {/* Calendar Date & Live Clock */}
        <button
          type="button"
          onClick={onToggleControlCenter}
          className="
            topbar-text text-[12px] font-medium text-[var(--color-text)]
            tabular-nums tracking-[-0.01em] px-1.5 py-0.5 rounded-[4px]
            hover:bg-[var(--color-surface-hover)] transition-colors
            cursor-default whitespace-nowrap focus:outline-none
          "
          title="Calendar & Clock"
        >
          <span>{dateFormatter.format(time)}</span>
          <span className="mx-1.5 opacity-40">·</span>
          <span>{timeFormatter.format(time)}</span>
        </button>
      </div>
    </header>
  );
}


