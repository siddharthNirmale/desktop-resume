import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSun,
  FiMoon,
  FiEye,
  FiRotateCcw,
  FiCloud,
  FiClock,
  FiSliders,
  FiCpu,
  FiTarget,
  FiCheck,
  FiDownload,
  FiMail,
  FiCopy,
  FiTerminal,
  FiX,
  FiLayers,
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import resume from "../data/resume";

const ACCENT_COLORS = [
  { id: "violet", value: "#BF5AF2", name: "Violet" },
  { id: "indigo", value: "#5E5CE6", name: "Indigo" },
  { id: "blue", value: "#0A84FF", name: "Blue" },
  { id: "green", value: "#30D158", name: "Green" },
  { id: "yellow", value: "#FFD60A", name: "Yellow" },
  { id: "orange", value: "#FF9F0A", name: "Orange" },
  { id: "red", value: "#FF453A", name: "Red" },
];

const WIDGET_CONFIGS = [
  { id: "weather", name: "Weather", icon: FiCloud, desc: "Indore live forecast" },
  { id: "clock", name: "Time & Timer", icon: FiClock, desc: "Clock, stopwatch & timer" },
  { id: "theme", name: "Appearance", icon: FiSliders, desc: "Wallpapers & accent" },
  { id: "skills", name: "Tech Stack", icon: FiCpu, desc: "Core stack rotating card" },
  { id: "learning", name: "Focus Tracker", icon: FiTarget, desc: "Current learning goal" },
  { id: "github", name: "Contributions", icon: FaGithub, desc: "GitHub activity graph" },
];

export default function ControlCenter({
  isOpen,
  onClose,
  windows = [],
  toggleWindow,
  toggleWidget,
  minimizeAll,
  restoreAll,
  resetLayout,
  bringToFront,
}) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("os-theme");
    if (saved) return saved === "light";
    return document.documentElement.classList.contains("light-theme");
  });

  const [activeAccent, setActiveAccent] = useState(() => {
    if (typeof window === "undefined") return "violet";
    const saved = localStorage.getItem("os-accent");
    return (
      ACCENT_COLORS.find(
        (c) =>
          c.value.toLowerCase() === saved?.toLowerCase() ||
          c.id.toLowerCase() === saved?.toLowerCase()
      )?.id ?? "violet"
    );
  });

  // Watch external theme changes (from Dock or Widget)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const activeIsLight =
        document.documentElement.classList.contains("light-theme") ||
        document.body.classList.contains("light-theme");
      setIsLight(activeIsLight);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleThemeToggle = useCallback(() => {
    const nextLight = !isLight;
    document.documentElement.classList.toggle("light-theme", nextLight);
    document.body.classList.toggle("light-theme", nextLight);
    localStorage.setItem("os-theme", nextLight ? "light" : "dark");
    setIsLight(nextLight);
  }, [isLight]);

  const handleAccentChange = useCallback((colorId, colorValue) => {
    setActiveAccent(colorId);
    document.documentElement.style.setProperty("--color-accent", colorValue);
    localStorage.setItem("os-accent", colorValue);
  }, []);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("siddharth175nirmale1@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setCopiedEmail(false);
    }
  }, []);

  const handleDownloadResume = useCallback(() => {
    const link = document.createElement("a");
    link.href = resume;
    link.setAttribute("download", "Siddharth_Nirmale_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleOpenTerminal = useCallback(() => {
    toggleWindow("terminal", "isOpen", true);
    toggleWindow("terminal", "isMinimized", false);
    bringToFront("terminal");
    onClose?.();
  }, [toggleWindow, bringToFront, onClose]);

  // Compute active states for windows & widgets
  const openWindows = useMemo(
    () => windows.filter((w) => w.type === "window" && w.isOpen),
    [windows]
  );
  const allWindowsMinimized = useMemo(
    () => openWindows.length > 0 && openWindows.every((w) => w.isMinimized),
    [openWindows]
  );

  const activeWidgetsCount = useMemo(
    () => windows.filter((w) => w.type === "widget" && w.isOpen).length,
    [windows]
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[999999] pointer-events-auto"
        onClick={onClose}
      >
        {/* Backdrop transparent capture */}
        <div className="absolute inset-0 bg-transparent" />

        {/* Popover Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -10 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="
            absolute top-[calc(var(--topbar-height,26px)+8px)] right-3 sm:right-6
            w-[340px] sm:w-[360px] max-w-[calc(100vw-24px)]
            bg-[var(--color-surface-elevated)]/90 backdrop-blur-2xl
            border border-[var(--color-surface-border)] rounded-2xl
            shadow-[0_20px_50px_rgba(0,0,0,0.45)]
            overflow-hidden font-primary select-none
            text-[var(--color-text)]
          "
        >
          {/* ═══════════════════════════════════════
              HEADER
          ═══════════════════════════════════════ */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-surface-border)] bg-[var(--color-surface-dark)]/50">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
                <FiSliders size={13} strokeWidth={2.2} />
              </div>
              <span className="text-[12px] font-heading font-semibold tracking-tight text-[var(--color-text)]">
                Control Center
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] text-[10px] font-medium text-[var(--color-text-tertiary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
              <button
                type="button"
                onClick={onClose}
                className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-inactive)] transition-colors"
                title="Close"
              >
                <FiX size={13} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="p-3.5 space-y-3.5 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
            {/* ═══════════════════════════════════════
                TOP QUICK SYSTEM TOGGLES (Row)
            ═══════════════════════════════════════ */}
            <div className="grid grid-cols-3 gap-2">
              {/* 1. Theme Toggle */}
              <button
                type="button"
                onClick={handleThemeToggle}
                className="
                  flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl
                  border border-[var(--color-surface-border)] bg-[var(--color-surface)]
                  hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-surface-border-strong)]
                  transition-all duration-150 group cursor-default text-center
                "
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-surface-inactive)] text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  {isLight ? <FiMoon size={14} /> : <FiSun size={14} />}
                </div>
                <span className="text-[10px] font-medium leading-none text-[var(--color-text-secondary)]">
                  {isLight ? "Dark Mode" : "Light Mode"}
                </span>
              </button>

              {/* 2. Show Desktop / Toggle Windows */}
              <button
                type="button"
                onClick={allWindowsMinimized ? restoreAll : minimizeAll}
                className="
                  flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl
                  border border-[var(--color-surface-border)] bg-[var(--color-surface)]
                  hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-surface-border-strong)]
                  transition-all duration-150 group cursor-default text-center
                "
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-surface-inactive)] text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  <FiEye size={14} />
                </div>
                <span className="text-[10px] font-medium leading-none text-[var(--color-text-secondary)]">
                  {allWindowsMinimized ? "Show Windows" : "Show Desktop"}
                </span>
              </button>

              {/* 3. Reset Layout */}
              <button
                type="button"
                onClick={resetLayout}
                className="
                  flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl
                  border border-[var(--color-surface-border)] bg-[var(--color-surface)]
                  hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-surface-border-strong)]
                  transition-all duration-150 group cursor-default text-center
                "
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-surface-inactive)] text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  <FiRotateCcw size={14} />
                </div>
                <span className="text-[10px] font-medium leading-none text-[var(--color-text-secondary)]">
                  Reset Layout
                </span>
              </button>
            </div>

            {/* ═══════════════════════════════════════
                ACCENT COLOR PICKER
            ═══════════════════════════════════════ */}
            <div className="p-2.5 rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.1em] text-[var(--color-text-tertiary)]">
                  Accent Color
                </span>
                <span className="text-[9px] font-medium text-[var(--color-accent)] capitalize">
                  {activeAccent}
                </span>
              </div>
              <div className="flex items-center justify-between">
                {ACCENT_COLORS.map((color) => {
                  const isSelected = activeAccent === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => handleAccentChange(color.id, color.value)}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                      className={`
                        relative flex h-6 w-6 items-center justify-center rounded-full
                        transition-all duration-150 cursor-default outline-none
                        ${
                          isSelected
                            ? "ring-2 ring-[var(--color-text)] ring-offset-2 ring-offset-[var(--color-surface)] scale-110"
                            : "opacity-80 hover:opacity-100 hover:scale-105"
                        }
                      `}
                    >
                      {isSelected && (
                        <FiCheck size={11} className="text-white stroke-[3.5]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ═══════════════════════════════════════
                DESKTOP WIDGETS MANAGER
            ═══════════════════════════════════════ */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <FiLayers size={11} className="text-[var(--color-text-tertiary)]" />
                  <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.1em] text-[var(--color-text-tertiary)]">
                    Desktop Widgets
                  </span>
                </div>
                <span className="text-[9px] font-medium text-[var(--color-text-disabled)]">
                  {activeWidgetsCount} of {WIDGET_CONFIGS.length} active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {WIDGET_CONFIGS.map((item) => {
                  const widgetObj = windows.find((w) => w.id === item.id);
                  const isWidgetOpen = Boolean(widgetObj?.isOpen);
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleWidget(item.id)}
                      className={`
                        flex items-center gap-2.5 p-2 rounded-xl text-left
                        border transition-all duration-150 cursor-default group
                        ${
                          isWidgetOpen
                            ? "bg-[var(--color-accent)]/10 border-[var(--color-accent)]/30 text-[var(--color-text)]"
                            : "bg-[var(--color-surface)] border-[var(--color-surface-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
                        }
                      `}
                    >
                      <div
                        className={`
                          flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors
                          ${
                            isWidgetOpen
                              ? "bg-[var(--color-accent)] text-white shadow-sm"
                              : "bg-[var(--color-surface-inactive)] text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text)]"
                          }
                        `}
                      >
                        <Icon size={13} strokeWidth={2} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-medium leading-none truncate">
                            {item.name}
                          </span>
                          <span
                            className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                              isWidgetOpen
                                ? "bg-[var(--color-accent)]"
                                : "bg-[var(--color-surface-border)]"
                            }`}
                          />
                        </div>
                        <span className="text-[9px] text-[var(--color-text-tertiary)] leading-none truncate block mt-1">
                          {isWidgetOpen ? "Visible on desktop" : "Hidden"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ═══════════════════════════════════════
                QUICK ACTIONS & RESUME
            ═══════════════════════════════════════ */}
            <div className="pt-1 border-t border-[var(--color-surface-border)] flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadResume}
                className="
                  flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg
                  bg-[var(--color-accent)] text-white text-[11px] font-semibold
                  hover:brightness-110 active:scale-[0.98] transition-all cursor-default
                "
              >
                <FiDownload size={12} strokeWidth={2.2} />
                <span>Resume PDF</span>
              </button>

              <button
                type="button"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
                className="
                  flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg
                  bg-[var(--color-surface)] border border-[var(--color-surface-border)]
                  hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] text-[11px] font-medium
                  active:scale-[0.98] transition-all cursor-default
                "
              >
                {copiedEmail ? (
                  <>
                    <FiCheck size={12} className="text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <FiMail size={12} className="text-[var(--color-text-tertiary)]" />
                    <span>Email</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleOpenTerminal}
                title="Open Terminal shell"
                className="
                  flex items-center justify-center p-2 rounded-lg
                  bg-[var(--color-surface)] border border-[var(--color-surface-border)]
                  hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)]
                  active:scale-[0.98] transition-all cursor-default
                "
              >
                <FiTerminal size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
