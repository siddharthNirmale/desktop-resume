import { useState, useEffect } from "react";
import { FiGithub, FiLinkedin, FiMail, FiSliders, FiSearch } from "react-icons/fi";
import Tooltip from "./Tooltip";

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
          LEFT CLUSTER: System Menu + Menus + Search
      ────────────────────────────────────────── */}
      <div className="flex items-center gap-1">
        {/* System Menu Icon */}
        <Tooltip content="System Menu" side="top" delay={300}>
          <button
            type="button"
            onClick={onToggleControlCenter}
            className="
              flex h-[22px] px-1.5 items-center justify-center rounded-[4px]
              text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]
              active:bg-[var(--color-surface-active)] transition-colors
              cursor-default focus:outline-none
            "
            aria-label="System Menu"
          >
            <span className="text-[13px] leading-none select-none">😈</span>
          </button>
        </Tooltip>

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
        <Tooltip content="Search commands" shortcut="⌘K" side="top" delay={300}>
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
            aria-label="Search commands"
          >
            <FiSearch size={11} strokeWidth={2.2} />
            <span className="text-[10px] font-mono opacity-80 tracking-wider">⌘K</span>
          </button>
        </Tooltip>
      </div>

      {/* ──────────────────────────────────────────
          RIGHT CLUSTER: Status & Available Indicator
      ────────────────────────────────────────── */}
      <div className="topbar-icons flex items-center gap-1 sm:gap-1.5 text-[var(--color-text-secondary)]">
        {/* Subtle Available for Opportunities Indicator */}
        <Tooltip content="Get in touch" side="top" delay={250}>
          <button
            type="button"
            onClick={() => handleOpenWindow("contact")}
            className="
              hidden lg:inline-flex items-center px-2 py-0.5 rounded-[4px]
              text-[11px] font-normal text-[var(--color-text-tertiary)]
              hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]
              transition-colors cursor-default focus:outline-none
            "
            aria-label="Available for Opportunities"
          >
            <span>Available for Opportunities</span>
          </button>
        </Tooltip>

        {/* GitHub */}
        <Tooltip content="GitHub Profile" side="top" delay={200}>
          <a
            href="https://github.com/siddharthNirmale"
            target="_blank"
            rel="noreferrer"
            className="
              flex h-[22px] w-[24px] items-center justify-center rounded-[4px]
              hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]
              transition-colors cursor-default
            "
            aria-label="GitHub Profile"
          >
            <FiGithub size={13} strokeWidth={2} />
          </a>
        </Tooltip>

        {/* LinkedIn */}
        <Tooltip content="LinkedIn Profile" side="top" delay={200}>
          <a
            href="https://linkedin.com/in/siddharth-nirmale"
            target="_blank"
            rel="noreferrer"
            className="
              flex h-[22px] w-[24px] items-center justify-center rounded-[4px]
              hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]
              transition-colors cursor-default
            "
            aria-label="LinkedIn Profile"
          >
            <FiLinkedin size={13} strokeWidth={2} />
          </a>
        </Tooltip>

        {/* Email */}
        <Tooltip content="Send Email" side="top" delay={200}>
          <a
            href="mailto:siddharth175nirmale1@gmail.com"
            className="
              flex h-[22px] w-[24px] items-center justify-center rounded-[4px]
              hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]
              transition-colors cursor-default
            "
            aria-label="Send Email"
          >
            <FiMail size={13} strokeWidth={2} />
          </a>
        </Tooltip>

        {/* Control Center Toggle */}
        <Tooltip content="Control Center" side="top" delay={200}>
          <button
            type="button"
            onClick={onToggleControlCenter}
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
        </Tooltip>

        {/* Hairline Divider */}
        <div className="topbar-divider w-[1px] h-3.5 bg-[var(--color-divider)] mx-1" />

        {/* Calendar Date & Live Clock */}
        <Tooltip content="Calendar & Time" side="top" delay={300}>
          <button
            type="button"
            onClick={onToggleControlCenter}
            className="
              topbar-text text-[12px] font-medium text-[var(--color-text)]
              tabular-nums tracking-[-0.01em] px-1.5 py-0.5 rounded-[4px]
              hover:bg-[var(--color-surface-hover)] transition-colors
              cursor-default whitespace-nowrap focus:outline-none
            "
            aria-label="Calendar & Clock"
          >
            <span>{dateFormatter.format(time)}</span>
            <span className="mx-1.5 opacity-40">·</span>
            <span>{timeFormatter.format(time)}</span>
          </button>
        </Tooltip>
      </div>
    </header>
  );
}




