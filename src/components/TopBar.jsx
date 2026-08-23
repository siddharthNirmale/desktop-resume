import { useState, useEffect } from "react";
import { FiGithub, FiLinkedin, FiMail, FiSliders, FiSearch } from "react-icons/fi";

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

// Personal Monogram Mark SVG (Clean geometric SN)
function MonogramMark({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7" fill="currentColor" fillOpacity="0.12" />
      <path
        d="M9 11.5C9 10.12 10.12 9 11.5 9H14.5C15.88 9 17 10.12 17 11.5V12C17 13.38 15.88 14.5 14.5 14.5H11.5C10.12 14.5 9 15.62 9 17V20.5C9 21.88 10.12 23 11.5 23H14.5C15.88 23 17 21.88 17 20.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M20 23V9L26 23V9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Menu Items for TopBar
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
          LEFT CLUSTER: System Monogram + Menus + Search
      ────────────────────────────────────────── */}
      <div className="flex items-center gap-1">
        {/* System Monogram Icon */}
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
          aria-label="System Menu"
        >
          <MonogramMark className="w-3.5 h-3.5 text-[var(--color-text)]" />
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

        {/* Desktop Menus (Desktop view) */}
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
          RIGHT CLUSTER: Status & Available Indicator
      ────────────────────────────────────────── */}
      <div className="topbar-icons flex items-center gap-1 sm:gap-1.5 text-[var(--color-text-secondary)]">
        {/* Subtle Available to Hire Indicator */}
        <button
          type="button"
          onClick={() => handleOpenWindow("contact")}
          className="
            hidden lg:inline-flex items-center px-2 py-0.5 rounded-[4px]
            text-[11px] font-normal text-[var(--color-text-tertiary)]
            hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]
            transition-colors cursor-default focus:outline-none
          "
          title="Available for opportunities"
        >
          <span>Available to Hire</span>
        </button>

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



